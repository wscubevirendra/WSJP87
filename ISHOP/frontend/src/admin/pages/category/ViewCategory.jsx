import React from 'react';
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Clothing',
    slug: 'clothing',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Home Appliances',
    slug: 'home-appliances',
    status: 'Active',
  },
];

const ViewCategory = ({ onBack }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-sm font-medium text-blue-600 mb-4 hover:underline"
      >
        <FiArrowLeft className="mr-2" />
        Back to Dashboard
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Category List</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-gray-100 text-left text-sm uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Category Name</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="px-6 py-4">{cat.id}</td>
                <td className="px-6 py-4">{cat.name}</td>
                <td className="px-6 py-4">{cat.slug}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      cat.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {cat.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FiEdit2 />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
