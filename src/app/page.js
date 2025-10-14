'use client';

import { useState, useEffect } from 'react';
import { getPaginatedTickets } from '../use-cases/getPaginatedTickets';
import { getPaginatedOrders } from '../use-cases/getPaginatedOrders';
import { HomeIcon, TicketIcon, ShoppingBagIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import TicketDetails from '../components/TicketDetails';
import OrderDetails from '../components/OrderDetails';

// Sidebar Component
const Sidebar = ({ setView, onResetView }) => {
    const handleNavigation = (newView) => {
        setView(newView);
        onResetView();
    };

    return (
        <div className="w-64 bg-gray-800 text-white shadow-lg">
            <div className="p-6">
                <h1 className="text-3xl font-bold text-white tracking-wider">Support</h1>
            </div>
            <nav className="mt-4">
                <ul>
                    <li className="flex items-center px-6 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200" onClick={() => handleNavigation('tickets')}>
                        <TicketIcon className="h-6 w-6 mr-3" />
                        <span className="text-lg">Tickets</span>
                    </li>
                    <li className="flex items-center px-6 py-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200" onClick={() => handleNavigation('orders')}>
                        <ShoppingBagIcon className="h-6 w-6 mr-3" />
                        <span className="text-lg">Orders</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

// TicketList Component
const TicketList = ({ onTicketSelect }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastVisible, setLastVisible] = useState(null);
    const [isLastPage, setIsLastPage] = useState(false);

    const fetchTickets = async (lastDoc) => {
        setLoading(true);
        try {
            const { tickets: newTickets, lastVisible: newLastVisible } = await getPaginatedTickets(lastDoc);
            setTickets(newTickets);
            setLastVisible(newLastVisible);
            setIsLastPage(newTickets.length < 5);
        } catch (error) {
            console.error("Error fetching tickets: ", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTickets(null);
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-extrabold mb-8 text-gray-800">Tickets</h2>
            {loading ? <div className="text-center text-gray-500">Loading...</div> :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map(ticket => (
                        <div key={ticket.id} onClick={() => onTicketSelect(ticket)} 
                             className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-xl text-gray-900 mb-2 truncate">{ticket.title}</h3>
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${ticket.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {ticket.active ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">#{ticket.ticketid}</p>
                                <p className="text-gray-700 clamp-2">{ticket.message}</p>
                            </div>
                            <div className="bg-gray-50 px-6 py-3">
                                <p className="text-xs text-gray-500">User: {ticket.useremail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <div className="flex justify-between mt-8">
                <button onClick={() => fetchTickets(null)} disabled={loading} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50 flex items-center">
                    <ChevronLeftIcon className="h-5 w-5 mr-1"/> First Page
                </button>
                <button onClick={() => fetchTickets(lastVisible)} disabled={loading || isLastPage} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center">
                    Next Page <ChevronRightIcon className="h-5 w-5 ml-1"/>
                </button>
            </div>
        </div>
    );
};

// OrderList Component
const OrderList = ({ onOrderSelect }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastVisible, setLastVisible] = useState(null);
    const [isLastPage, setIsLastPage] = useState(false);

    const fetchOrders = async (lastDoc) => {
        setLoading(true);
        try {
            const { orders: newOrders, lastVisible: newLastVisible } = await getPaginatedOrders(lastDoc);
            setOrders(newOrders);
            setLastVisible(newLastVisible);
            setIsLastPage(newOrders.length < 5);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders(null);
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-extrabold mb-8 text-gray-800">Orders</h2>
            {loading ? <div className="text-center text-gray-500">Loading...</div> :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map(order => (
                        <div key={order.id} onClick={() => onOrderSelect(order)} 
                             className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-xl text-gray-900 mb-2">Order #{order.id}</h3>
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {order.status}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">Customer: {order.customer}</p>
                            </div>
                             <div className="bg-gray-50 px-6 py-3">
                                <p className="text-sm font-semibold text-gray-800">Total: ${order.total || 0}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <div className="flex justify-between mt-8">
                <button onClick={() => fetchOrders(null)} disabled={loading} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50 flex items-center">
                    <ChevronLeftIcon className="h-5 w-5 mr-1"/> First Page
                </button>
                <button onClick={() => fetchOrders(lastVisible)} disabled={loading || isLastPage} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center">
                    Next Page <ChevronRightIcon className="h-5 w-5 ml-1"/>
                </button>
            </div>
        </div>
    );
};


export default function Home() {
  const [view, setView] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

 const handleBackToTickets = () => {
    setSelectedTicket(null);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

 const resetView = () => {
    setSelectedTicket(null);
    setSelectedOrder(null);
  };

  const renderContent = () => {
    if (view === 'tickets') {
      if (selectedTicket) {
        return <TicketDetails ticket={selectedTicket} onBack={handleBackToTickets} />;
      }
      return <TicketList onTicketSelect={handleTicketSelect} />;
    } else if (view === 'orders') {
      if (selectedOrder) {
        return <OrderDetails order={selectedOrder} onBack={handleBackToOrders} />;
      }
      return <OrderList onOrderSelect={handleOrderSelect} />;
    }
    return null;
  };

  return (
    <div className="flex w-full bg-gray-100">
      <Sidebar setView={setView} onResetView={resetView} />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
}
