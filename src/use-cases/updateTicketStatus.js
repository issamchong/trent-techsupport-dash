import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const updateTicketStatus = async (ticketId, newStatus) => {
    const ticketRef = doc(db, 'tickets', ticketId);

    try {
        await updateDoc(ticketRef, {
            active: newStatus,
        });
    } catch (error) {
        console.error("Error updating ticket status: ", error);
        throw new Error('Failed to update status.');
    }
};
