import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

async function getOrders() {
  const ordersCol = collection(db, 'orders');
  const orderSnapshot = await getDocs(ordersCol);
  const orderList = orderSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  return orderList;
}

export { getOrders };
