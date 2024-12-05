import React, { useState, useEffect } from "react";

const BookMechanic = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [filteredMechanics, setFilteredMechanics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated database of mechanics in Kenya
    const mechanicsData = [
      { id: 1, name: "Mechanic A", lat: -1.286389, lng: 36.817223 }, // Nairobi
      { id: 2, name: "Mechanic B", lat: -4.043477, lng: 39.668207 }, // Mombasa
      { id: 3, name: "Mechanic C", lat: -0.514278, lng: 35.269779 }, // Eldoret
    ];
    setMechanics(mechanicsData);

    // Fetch user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Please enable location services for better results.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      // Calculate distances and filter nearby mechanics
      const nearbyMechanics = mechanics.filter((mechanic) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          mechanic.lat,
          mechanic.lng
        );
        return distance <= 10; // Filter within 10 km radius
      });
      setFilteredMechanics(nearbyMechanics);
    }
  }, [userLocation, mechanics]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Book a Mechanic
      </h1>
      {loading ? (
        <p className="text-center text-gray-600">Fetching your location...</p>
      ) : userLocation ? (
        <p className="text-center mb-4 text-gray-700">
          Your location: Lat {userLocation.lat.toFixed(3)}, Lng{" "}
          {userLocation.lng.toFixed(3)}
        </p>
      ) : (
        <p className="text-center text-red-600 mb-4">
          Unable to fetch your location. Please try again.
        </p>
      )}
      <h2 className="text-xl font-semibold mb-4 text-green-600">
        Nearby Mechanics:
      </h2>
      <ul className="space-y-4">
        {filteredMechanics.length > 0 ? (
          filteredMechanics.map((mechanic) => (
            <li
              key={mechanic.id}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
            >
              <p className="text-lg font-medium">{mechanic.name}</p>
              <p className="text-sm text-gray-500">
                Latitude: {mechanic.lat}, Longitude: {mechanic.lng}
              </p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No mechanics found within 10 km of your location.
          </p>
        )}
      </ul>
    </div>
  );
};

export default BookMechanic;
