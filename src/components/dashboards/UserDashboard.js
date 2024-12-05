import React from "react";

const UserDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Search Services</h2>
          <p className="mt-2">Search for nearby Tow Trucks or Mechanics.</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded mt-4">Search Now</button>
        </div>

        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Recent Requests</h2>
          <p className="mt-2">View your past service requests.</p>
          <button className="bg-green-600 text-white py-2 px-4 rounded mt-4">View Requests</button>
        </div>

        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <p className="mt-2">Edit your personal information.</p>
          <button className="bg-yellow-600 text-white py-2 px-4 rounded mt-4">Edit Profile</button>
        </div>

        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Make Payment</h2>
          <p className="mt-2">Pay for completed services.</p>
          <button className="bg-red-600 text-white py-2 px-4 rounded mt-4">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
