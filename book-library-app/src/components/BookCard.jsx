// src/components/BookCard.jsx
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'placeholder.jpg'}
        alt={book.title}
        className="w-20 h-28 object-cover mr-4"
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600">by {book.author_name?.join(', ')}</p>
        <p className="text-gray-500 text-sm">Publisher: {book.publisher?.[0] || 'N/A'}</p>
        <p className="text-sm">Year: {book.first_publish_year || 'N/A'}</p>
        <p className="text-sm">Language: {book.language?.[0]?.toUpperCase() || 'N/A'}</p>
        <p className="text-sm">Format: {book.type || 'N/A'}</p>
        <p className="text-sm">Rating: {Math.random().toFixed(1) * 5}/5</p>
      </div>
    </div>
  );
};

export default BookCard;


