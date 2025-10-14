import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase/config';

export const getPaginatedOrders = async (lastVisible) => {
    const ordersRef = collection(db, 'orders');
    let q;

    if (lastVisible) {
        q = query(ordersRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(5));
    } else {
        q = query(ordersRef, orderBy('createdAt', 'desc'), limit(5));
    }

    try {
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return { orders, lastVisible: newLastVisible };
    } catch (error) {
        console.error("Error fetching paginated orders: ", error);
        throw new Error('Failed to fetch orders.');
    }
};
