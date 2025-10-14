import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

async function getTickets() {
  const ticketsCol = collection(db, 'tickets');
  const ticketSnapshot = await getDocs(ticketsCol);
  const ticketList = ticketSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  return ticketList;
}

export { getTickets };
