import { db } from '../firebase/config';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

export const getOverviewData = async () => {
    // Orders
    const ordersRef = collection(db, 'orders');
    const ordersSnapshot = await getDocs(ordersRef);
    let totalRevenue = 0;
    let completedOrders = 0;
    let rejectedOrders = 0;
    let totalFulfillmentTime = 0;
    let fulfilledOrdersCount = 0;

    ordersSnapshot.forEach(doc => {
        const order = doc.data();
        if (order.status === 'Delivered' || order.status === 'Shipped') {
            totalRevenue += order.total;
            completedOrders++;
            if (order.createdAt && order.deliveredAt) {
                const fulfillmentTime = order.deliveredAt.toMillis() - order.createdAt.toMillis();
                totalFulfillmentTime += fulfillmentTime;
                fulfilledOrdersCount++;
            }
        }
        if (order.status === 'Rejected') {
            rejectedOrders++;
        }
    });

    const avgFulfillmentTime = fulfilledOrdersCount > 0 ? (totalFulfillmentTime / fulfilledOrdersCount) / (1000 * 60 * 60 * 24) : 0;

    // Users
    const usersRef = collection(db, 'users');
    const sevenDaysAgo = Timestamp.fromMillis(Date.now() - 7 * 24 * 60 * 60 * 1000);

    let activeUsers = 0;
    try {
        const activeUsersQuery = query(usersRef, where('lastLogin', '>', sevenDaysAgo));
        const activeUsersSnapshot = await getDocs(activeUsersQuery);
        activeUsers = activeUsersSnapshot.size;
    } catch (e) {
        console.error("Could not query active users, do you have a composite index setup in firestore?");
    }

    let newUsers = 0;
    try {
        const newUsersQuery = query(usersRef, where('createdAt', '>', sevenDaysAgo));
        const newUsersSnapshot = await getDocs(newUsersQuery);
        newUsers = newUsersSnapshot.size;
    } catch (e) {
        console.error("Could not query new users, do you have a composite index setup in firestore?");
    }


    // Tickets
    const ticketsRef = collection(db, 'tickets');
    const openDisputesQuery = query(ticketsRef, where('active', '==', true));
    const openDisputesSnapshot = await getDocs(openDisputesQuery);
    const openDisputes = openDisputesSnapshot.size;

    return {
        totalRevenue,
        avgFulfillmentTime: avgFulfillmentTime.toFixed(1),
        completedOrders,
        rejectedOrders,
        activeUsers,
        newUsers,
        openDisputes
    };
};