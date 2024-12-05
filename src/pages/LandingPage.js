import React from "react";
import { useNavigate } from "react-router-dom"; 
import towTruckImage from "../assets/tow-truck.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleFindTowTruck = () => {
    navigate("/find-tow-truck"); 
  };

  const handleBookMechanic = () => {
    navigate("/book-mechanic"); // Navigate to Book a Mechanic page
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${towTruckImage})`,
        }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
            Help is Just a Click Away!
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up">
            Locate tow trucks and mechanics nearby with ease.
          </p>
          <div>
            <button
              onClick={handleFindTowTruck}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mr-4 animate-pulse"
            >
              Find a Tow Truck
            </button>
            <button
              onClick={handleBookMechanic}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Book a Mechanic
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div className="bg-white shadow-lg p-6 rounded-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-4 text-green-600">Step 1</h3>
            <p className="text-gray-700">Open the app and share your location.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-4 text-yellow-600">Step 2</h3>
            <p className="text-gray-700">Select the service you need.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-4 text-orange-600">Step 3</h3>
            <p className="text-gray-700">Get help from the nearest provider.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
