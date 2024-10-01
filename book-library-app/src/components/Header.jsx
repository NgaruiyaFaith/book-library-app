// src/components/Header.jsx
import React from 'react';

const Header = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-50">
      <h1 className="text-6xl font-serif text-center">
        <span className="text-teal-500">Book</span>{' '}
        <span className="text-amber-500">wormish</span>
      </h1>
      <p className="text-xl text-gray-600 mt-4 italic">
        Dive into timeless classics with style
      </p>
      <div className="mt-6 w-full flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for title, author, publisher, etc etc."
          className="w-2/3 max-w-4xl p-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;





  


