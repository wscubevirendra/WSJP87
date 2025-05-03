import React from 'react';
import {
    FiUsers,
    FiShoppingCart,
    FiDollarSign,
    FiActivity
} from 'react-icons/fi';

const Dashboard = () => {
    // Summary data
    const stats = [
        {
            title: 'Total Users',
            value: 1240,
            icon: <FiUsers className="text-blue-600 text-2xl" />,
        },
        {
            title: 'Total Orders',
            value: 874,
            icon: <FiShoppingCart className="text-green-600 text-2xl" />,
        },
        {
            title: 'Revenue',
            value: '$49,300',
            icon: <FiDollarSign className="text-yellow-500 text-2xl" />,
        },
        {
            title: 'Active Sessions',
            value: 142,
            icon: <FiActivity className="text-red-500 text-2xl" />,
        },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-sm text-gray-500 font-medium">{item.title}</h2>
                                <p className="text-xl font-semibold text-gray-800">{item.value}</p>
                            </div>
                            <div className="p-2 bg-gray-100 rounded-full">
                                {item.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Optional: Add more sections below (Charts, Tables, etc.) */}
        </div>
    );
};

export default Dashboard;
