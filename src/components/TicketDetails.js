'use client';

import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { addResponseToTicket } from '../use-cases/addResponseToTicket';
import { updateTicketStatus } from '../use-cases/updateTicketStatus';

const TicketDetails = ({ ticket, onBack }) => {
    const [newMessage, setNewMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [currentTicket, setCurrentTicket] = useState(ticket);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const handleResponseSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setIsSubmitting(true);
        setError(null);

        const response = {
            message: newMessage,
            usertype: 'support',
            name: 'Support Team',
        };

        try {
            await addResponseToTicket(currentTicket.id, response);
            setNewMessage('');
            // Manually add the new response to the chat for instant feedback
            const newChat = [...(currentTicket.chat || []), { ...response, createdAt: new Date() }];
            setCurrentTicket({ ...currentTicket, chat: newChat });
        } catch (err) {
            setError('Failed to send response. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStatusUpdate = async () => {
        setIsUpdatingStatus(true);
        try {
            const newStatus = !currentTicket.active;
            await updateTicketStatus(currentTicket.id, newStatus);
            setCurrentTicket({ ...currentTicket, active: newStatus });
        } catch (error) {
            console.error("Failed to update status", error)
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-semibold">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Tickets
            </button>
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">{currentTicket.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">ID: {currentTicket.ticketid}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className={`px-4 py-2 rounded-full text-sm font-bold ${currentTicket.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {currentTicket.active ? 'Active' : 'Inactive'}
                        </div>
                        <button 
                            onClick={handleStatusUpdate}
                            disabled={isUpdatingStatus}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors">
                            {isUpdatingStatus ? 'Updating...' : `Mark as ${currentTicket.active ? 'Inactive' : 'Active'}`}
                        </button>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-6 mb-6">
                    <h3 className="font-bold text-xl text-gray-800 mb-3">Message</h3>
                    <p className="text-gray-700 leading-relaxed">{currentTicket.message || 'No message provided.'}</p>
                </div>
                <div className="border-t border-gray-200 pt-6 mb-8">
                    <h3 className="font-bold text-xl text-gray-800 mb-3">User</h3>
                    <p className="text-gray-700">{currentTicket.useremail || 'N/A'}</p>
                </div>

                {/* Chat History */}
                <div className="border-t border-gray-200 pt-6 mb-8">
                    <h3 className="font-bold text-xl text-gray-800 mb-6">Conversation</h3>
                    <div className="space-y-6">
                        {currentTicket.chat && currentTicket.chat.length > 0 ? currentTicket.chat.map((chatItem, index) => (
                            <div key={index} className={`flex items-start gap-4 ${chatItem.usertype === 'seller' ? 'justify-start' : 'justify-end'}`}>
                                {chatItem.usertype === 'seller' && (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
                                        {currentTicket.useremail ? currentTicket.useremail.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                                <div className={`p-4 rounded-lg max-w-xl shadow-sm ${chatItem.usertype === 'seller' ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}>
                                    <p className="font-bold text-sm mb-1">{chatItem.usertype === 'seller' ? currentTicket.useremail : 'Support'}</p>
                                    <p>{chatItem.message}</p>
                                    <p className={`text-xs mt-2 ${chatItem.usertype === 'seller' ? 'text-gray-500' : 'text-blue-100'} text-right`}>
                                        {chatItem.createdAt ? new Date(chatItem.createdAt.seconds * 1000).toLocaleString() : new Date().toLocaleString()}
                                    </p>
                                </div>
                                {chatItem.usertype !== 'seller' && (
                                     <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                                        S
                                    </div>
                                )}
                            </div>
                        )) : (
                            <p className="text-gray-500">No conversation yet.</p>
                        )}
                    </div>
                </div>

                {/* Response Form */}
                <form onSubmit={handleResponseSubmit} className="border-t border-gray-200 pt-8">
                    <h3 className="font-bold text-xl text-gray-800 mb-4">Add a Response</h3>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        rows="5"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your response here..."
                        disabled={isSubmitting}
                    ></textarea>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-all transform hover:scale-105"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Response'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TicketDetails;
