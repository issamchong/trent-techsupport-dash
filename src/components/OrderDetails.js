'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const OrderDetails = ({ order, onBack }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="flex items-center text-blue-500 mb-4">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Orders
            </button>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Order {order.id}</h2>
                        <p className="text-sm text-gray-500">Customer: {order.customer}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' : order.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                        {order.status}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">Items</h3>
                    <ul className="list-disc list-inside">
                        {order.items && order.items.map((item, index) => (
                            <li key={index} className="text-gray-700">{item.name} - {item.quantity} x ${item.price}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2">Total</h3>
                    <p className="text-gray-700">${order.total || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
