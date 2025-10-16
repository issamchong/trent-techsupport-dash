import { db } from '../firebase/config';
import { collection, getDocs, Timestamp } from 'firebase/firestore';

export const getOrderFlowData = async () => {
    const ordersRef = collection(db, 'orders');
    const ordersSnapshot = await getDocs(ordersRef);

    // Order Volume (last 7 days)
    const dailyVolume = Array(7).fill(0).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return { date: d.toISOString().split('T')[0], orders: 0 };
    }).reverse();
    const dayMap = dailyVolume.reduce((acc, item, index) => {
        acc[item.date] = index;
        return acc;
    }, {});

    // Order Status Breakdown
    const statusCounts = {
        Placed: 0,
        'In Inspection': 0,
        Approved: 0,
        Rejected: 0,
        'In Delivery': 0,
        Delivered: 0,
        Disputed: 0,
        Cancelled: 0,
    };

    // Average Time Per Step (in milliseconds)
    let totalPlacedToInspection = 0;
    let countPlacedToInspection = 0;
    let totalInspectionDuration = 0;
    let countInspectionDuration = 0;
    let totalApprovalToDelivery = 0;
    let countApprovalToDelivery = 0;

    ordersSnapshot.forEach(doc => {
        const order = doc.data();
        const createdAt = order.createdAt?.toDate();

        // Volume
        if (createdAt) {
            const orderDate = createdAt.toISOString().split('T')[0];
            if (dayMap[orderDate] !== undefined) {
                dailyVolume[dayMap[orderDate]].orders++;
            }
        }

        // Status
        if (order.status && statusCounts.hasOwnProperty(order.status)) {
            statusCounts[order.status]++;
        }

        // Durations
        const inspectionStartedAt = order.inspectionStartedAt?.toDate();
        const inspectedAt = order.inspectedAt?.toDate();
        const deliveryStartedAt = order.deliveryStartedAt?.toDate();

        if (createdAt && inspectionStartedAt) {
            totalPlacedToInspection += inspectionStartedAt - createdAt;
            countPlacedToInspection++;
        }
        if (inspectionStartedAt && inspectedAt) {
            totalInspectionDuration += inspectedAt - inspectionStartedAt;
            countInspectionDuration++;
        }
        if (inspectedAt && deliveryStartedAt && (order.status === 'Approved' || order.status === 'In Delivery' || order.status === 'Delivered')) {
             totalApprovalToDelivery += deliveryStartedAt - inspectedAt;
             countApprovalToDelivery++;
        }
    });
    
    const toHours = (ms) => (ms / (1000 * 60 * 60)).toFixed(1);

    const avgPlacedToInspection = countPlacedToInspection > 0 ? toHours(totalPlacedToInspection / countPlacedToInspection) : 0;
    const avgInspectionDuration = countInspectionDuration > 0 ? toHours(totalInspectionDuration / countInspectionDuration) : 0;
    const avgApprovalToDelivery = countApprovalToDelivery > 0 ? toHours(totalApprovalToDelivery / countApprovalToDelivery) : 0;

    const orderStatusData = Object.keys(statusCounts).map(key => ({ name: key, value: statusCounts[key] })).filter(item => item.value > 0);

    // Format daily volume for chart
    const orderVolumeData = dailyVolume.map(d => ({...d, name: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}));

    return {
        orderVolumeData,
        orderStatusData,
        avgPlacedToInspection,
        avgInspectionDuration,
        avgApprovalToDelivery,
    };
};