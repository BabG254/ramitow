import React from "react";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="mt-2">List of all users, edit or delete them.</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded mt-4">View Users</button>
        </div>

        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Service Providers Management</h2>
          <p className="mt-2">Approve or manage Tow Trucks and Mechanics.</p>
          <button className="bg-green-600 text-white py-2 px-4 rounded mt-4">Manage Providers</button>
        </div>

        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Payments Overview</h2>
          <p className="mt-2">View total earnings and payments made.</p>
          <button className="bg-yellow-600 text-white py-2 px-4 rounded mt-4">View Payments</button>
        </div>

        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="mt-2">Generate or view service and payment reports.</p>
          <button className="bg-red-600 text-white py-2 px-4 rounded mt-4">View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
