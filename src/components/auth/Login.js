import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    if (email === "admin@ramitow.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/admin-dashboard");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      const { token, user } = response.data;
      document.cookie = `token=${token}; Secure; HttpOnly`;
      localStorage.setItem("user", JSON.stringify(user));
  
      const roleRedirects = {
        admin: "/admin-dashboard",
        user: "/user-dashboard",
        tow_truck: "/tow-truck-holder-dashboard",
        mechanic: "/mechanic-dashboard",
      };
  
      navigate(roleRedirects[user.role] || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Log In</h1>
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg w-full"
        >
          Log In
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
