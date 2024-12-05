import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    additionalInfo: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => setUserType(e.target.value);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters long, include a number and a capital letter.");
      return;
    }
  
    try {
      const payload = {
        ...formData,
        role: userType,
        ...(userType === "tow_truck" && { towTruckCompany: formData.additionalInfo }),
        ...(userType === "mechanic" && { specialization: formData.additionalInfo }),
      };
  
      const response = await axios.post("http://localhost:5000/api/auth/signup", payload);
      if (response.status === 201) navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Sign Up</h1>
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSignUp}
      >
        <label className="block text-gray-700 mb-2">I am a:</label>
        <select
          value={userType}
          onChange={handleUserTypeChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6"
        >
          <option value="user">User</option>
          <option value="tow_truck">Tow Truck Holder</option>
          <option value="mechanic">Mechanic</option>
        </select>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6"
          required
        />
        {userType !== "user" && (
          <input
            type="text"
            name="additionalInfo"
            placeholder={
              userType === "tow_truck"
                ? "Tow Truck Company Name"
                : "Specialization (e.g., Engine Repair)"
            }
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
        )}

        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg w-full">
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="text-center mt-4">
          <p>Already have an account?</p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 underline"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
