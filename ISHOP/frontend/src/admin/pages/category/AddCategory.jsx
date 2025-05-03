import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const AddCategory = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button className="flex items-center text-sm font-medium text-blue-600 mb-4 hover:underline">
        <FiArrowLeft className="mr-2" />
        Back to Category List
      </button>

      {/* Form Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Category</h2>

      {/* Form */}
      <form className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter category name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="enter-slug-here"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
