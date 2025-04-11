import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-blue-600 p-6 flex justify-between items-center text-white shadow-md">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="RAMITOW Logo" className="h-20 w-21" />
      </div>
      <nav>
        <ul className="flex space-x-6 text-lg">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
             <a href="/signup" className="hover:underline">Sign Up</a>
          </li>
          <li>
             <a href="/login" className="hover:underline">Log In</a>
         </li>
          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
