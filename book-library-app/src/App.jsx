import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import ReadingList from './components/ReadingList';
import Reviews from './components/Reviews';
import DarkModeToggle from './components/DarkModeToggle';
import axios from 'axios';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);

  // Safely destructuring user, login, register, and logout
  const authContext = useAuth();
  const { user, login, register, logout } = authContext || {};

  // Function to handle book search
  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      if (response.data.docs.length > 0) {
        setSearchResults(response.data.docs);
        setError(null);
      } else {
        setSearchResults([]);
        setError('No books found for this search query.');
      }
    } catch (err) {
      setError('Error fetching book data.');
      console.error(err);
    }
  };

  // Handle book selection from search results
  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        {/* Header with title and dark mode toggle */}
        <header className="p-4 flex justify-between items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-teal-600">Book</span>
              <span className="text-yellow-600">Wormish</span>
            </h1>
          </div>
          <DarkModeToggle />
        </header>

        {/* Search Bar */}
        <div className="flex justify-center mt-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Show error message if search fails */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Display search results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {searchResults.map((book) => (
            <BookCard key={book.key} book={book} onSelect={handleBookSelect} />
          ))}
        </div>

        {/* Book Details */}
        {selectedBook && (
          <div className="p-4">
            <BookDetails book={selectedBook} />
            <Reviews book={selectedBook} />
          </div>
        )}

        {/* Show user’s reading list if logged in */}
        {user && (
          <div className="p-4">
            <ReadingList />
          </div>
        )}

        {/* Authentication Buttons */}
        <div className="p-4 flex justify-center">
          {user ? (
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded"
                onClick={() => login('test@example.com', 'password123')}
              >
                Login
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => register('test@example.com', 'password123')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;











