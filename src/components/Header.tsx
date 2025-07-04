// src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-100 text-gray-800 p-4 shadow-md w-full fixed top-0 left-0 z-10">
      <div className="flex justify-between items-center container mx-auto">
        {/* <h1 className="text-xl font-bold">Auction App</h1> */}
        <h1 className="text-xl font-bold">Lee Check</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-lg hover:text-purple-600 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-lg hover:text-purple-600 transition duration-300">About</Link>
            </li>
            <li>
              <Link to="/contact" className="text-lg hover:text-purple-600 transition duration-300">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
