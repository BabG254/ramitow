import React from "react";

const TowTruckHolderDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Tow Truck Holder Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Vehicle & Availability Registration</h2>
          <p className="mt-2">Register your vehicle and working hours.</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded mt-4">Register Vehicle</button>
        </div>

        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Requests Overview</h2>
          <p className="mt-2">View requests from users needing your services.</p>
          <button className="bg-green-600 text-white py-2 px-4 rounded mt-4">View Requests</button>
        </div>

        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Earnings Overview</h2>
          <p className="mt-2">Track your completed jobs and earnings.</p>
          <button className="bg-yellow-600 text-white py-2 px-4 rounded mt-4">View Earnings</button>
        </div>

        <div className="card bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Payments</h2>
          <p className="mt-2">Receive payments for completed jobs.</p>
          <button className="bg-red-600 text-white py-2 px-4 rounded mt-4">Receive Payment</button>
        </div>
      </div>
    </div>
  );
};

export default TowTruckHolderDashboard;
