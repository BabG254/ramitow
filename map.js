import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Store your API key in .env file
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      initMap();
    });
  }, []);

  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        const userLocation = { lat: userLat, lng: userLng };

        const newMap = new window.google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 12,
        });

        setMap(newMap);

        const marker = new window.google.maps.Marker({
          position: userLocation,
          map: newMap,
          title: "You are here",
        });

        fetchNearbyServices(userLat, userLng);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchNearbyServices = (userLat, userLng) => {
    fetch(`/api/searchNearbyServices?latitude=${userLat}&longitude=${userLng}&radius=10`)
      .then(response => response.json())
      .then(data => {
        console.log(data.services);
        data.services.forEach(service => {
          const serviceLocation = { lat: service.latitude, lng: service.longitude };
          
          new window.google.maps.Marker({
            position: serviceLocation,
            map: map,
            title: service.username,
          });
        });
      });
  };

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;