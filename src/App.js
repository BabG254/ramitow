import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import FindTowTruck from "./pages/FindTowTruck";
import BookMechanic from "./pages/BookMechanic";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import UserDashboard from "./components/dashboards/UserDashboard";
import TowTruckHolderDashboard from "./components/dashboards/TowTruckHolderDashboard";
import MechanicDashboard from "./components/dashboards/MechanicDashboard";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setLoading(false); // Mark role check as complete
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const PrivateRoute = ({ role, children }) => {
    return userRole === role ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-tow-truck" element={<FindTowTruck />} />
        <Route path="/book-mechanic" element={<BookMechanic />} />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>}
        />
        <Route
          path="/user-dashboard"
          element={<PrivateRoute role="user"><UserDashboard /></PrivateRoute>}
        />
        <Route
          path="/tow-truck-dashboard"
          element={<PrivateRoute role="tow_truck"><TowTruckHolderDashboard /></PrivateRoute>}
        />
        <Route
          path="/mechanic-dashboard"
          element={<PrivateRoute role="mechanic"><MechanicDashboard /></PrivateRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
