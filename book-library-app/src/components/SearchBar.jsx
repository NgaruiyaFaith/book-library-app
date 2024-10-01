import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
    setTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-4">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search for books..."
        className="border border-teal-500 rounded p-2 w-full md:w-2/3"
      />
      <button type="submit" className="ml-2 bg-teal-500 text-white px-4 rounded">Search</button>
    </form>
  );
};

export default SearchBar;






  
