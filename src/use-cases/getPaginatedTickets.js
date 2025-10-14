import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase/config';

export const getPaginatedTickets = async (lastVisible) => {
    const ticketsRef = collection(db, 'tickets');
    let q;

    if (lastVisible) {
        q = query(ticketsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(5));
    } else {
        q = query(ticketsRef, orderBy('createdAt', 'desc'), limit(5));
    }

    try {
        const querySnapshot = await getDocs(q);
        const tickets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return { tickets, lastVisible: newLastVisible };
    } catch (error) {
        console.error("Error fetching paginated tickets: ", error);
        throw new Error('Failed to fetch tickets.');
    }
};
