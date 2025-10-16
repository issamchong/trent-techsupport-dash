'use client';

import { useState, useEffect } from 'react';
import { getOrderFlowData } from '../use-cases/getOrderFlowData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const OrderFlow = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flowData = await getOrderFlowData();
        setData(flowData);
      } catch (error) {
        console.error("Error fetching order flow data: ", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0', '#5A2A27'];

  return (
    <div className="p-6 bg-gray-50 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Order Flow</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Order Volume (Last Week)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.orderVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Order Status Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {data.orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Average Time Per Step (Hours)</h3>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <ClockIcon className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold">Placed to Inspection</p>
                <p className="text-2xl font-bold">{data.avgPlacedToInspection}h</p>
              </div>
              <div className="text-center">
                <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="font-semibold">Inspection Duration</p>
                <p className="text-2xl font-bold">{data.avgInspectionDuration}h</p>
              </div>
              <div className="text-center">
                <XCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-2" />
                <p className="font-semibold">Approval to Delivery</p>
                <p className="text-2xl font-bold">{data.avgApprovalToDelivery}h</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-red-500">Error loading data.</div>
      )}
    </div>
  );
};

export default OrderFlow;
