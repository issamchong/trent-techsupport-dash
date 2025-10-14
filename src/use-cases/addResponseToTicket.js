import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';

export const addResponseToTicket = async (ticketId, response) => {
    const ticketRef = doc(db, 'tickets', ticketId);

    try {
        await updateDoc(ticketRef, {
            chat: arrayUnion({
                ...response,
                createdAt: new Date(),
            }),
        });
    } catch (error) {
        console.error("Error adding response to ticket: ", error);
        throw new Error('Failed to add response.');
    }
};
