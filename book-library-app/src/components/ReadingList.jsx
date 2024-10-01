import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const ReadingList = () => {
  const { user } = useAuth();
  const [readingList, setReadingList] = useState([]);

  const fetchReadingList = async () => {
    if (user) {
      const q = query(collection(db, 'readingLists'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const books = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReadingList(books);
    }
  };

  useEffect(() => {
    fetchReadingList();
  }, [user]);

  const addToReadingList = async (book) => {
    if (user) {
      await addDoc(collection(db, 'readingLists'), {
        userId: user.uid,
        book,
      });
      fetchReadingList();
    }
  };

  return (
    <div>
      <h2>Your Reading List</h2>
      {readingList.length === 0 ? (
        <p>No books in your reading list.</p>
      ) : (
        <ul>
          {readingList.map((item) => (
            <li key={item.id}>{item.book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadingList;

