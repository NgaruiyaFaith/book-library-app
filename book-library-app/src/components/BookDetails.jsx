// src/components/BookDetails.jsx
import React from 'react';

const BookDetails = ({ book }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <img
        src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'placeholder.jpg'}
        alt={book.title}
        className="w-48 h-72 object-cover mb-4"
      />
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-lg text-gray-600">by {book.author_name?.join(', ')}</p>
      <p className="mt-2">Publisher: {book.publisher?.[0]}</p>
      <p>Publication Date: {book.first_publish_year}</p>
      <p>ISBN: {book.isbn?.[0]}</p>
      <p>Number of Pages: {book.number_of_pages_median}</p>
      <p>Subjects: {book.subject?.join(', ') || 'N/A'}</p>
    </div>
  );
};

export default BookDetails;

