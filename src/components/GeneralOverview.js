'use client';

import { useState, useEffect } from 'react';
import { getOverviewData } from '../use-cases/getOverviewData';
import { ChartBarIcon, ClockIcon, CurrencyDollarIcon, CheckCircleIcon, XCircleIcon, UserGroupIcon, UserPlusIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const GeneralOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const overviewData = await getOverviewData();
        setData(overviewData);
      } catch (error) {
        console.error("Error fetching overview data: ", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">General Overview</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Mini-cards for key numbers */}
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${data.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <ClockIcon className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Avg. Fulfillment Time</p>
              <p className="text-2xl font-bold text-gray-900">{data.avgFulfillmentTime} days</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Completed Orders</p>
              <p className="text-2xl font-bold text-gray-900">{data.completedOrders}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-500 mr-4" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Rejected Orders</p>
              <p className="text-2xl font-bold text-gray-900">{data.rejectedOrders}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <UserGroupIcon className="h-8 w-8 text-purple-500 mr-4" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{data.activeUsers}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <UserPlusIcon className="h-8 w-8 text-yellow-500 mr-4" />
            <div>
              <p className="text-lg font-semibold text-gray-700">New Users</p>
              <p className="text-2xl font-bold text-gray-900">{data.newUsers}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <ExclamationCircleIcon className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <p className="text-lg font-semibold text-gray-700">Disputes Open</p>
              <p className="text-2xl font-bold text-gray-900">{data.openDisputes}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500">Error loading data.</div>
      )}
    </div>
  );
};

export default GeneralOverview;
