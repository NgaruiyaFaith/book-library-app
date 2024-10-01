import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const Reviews = ({ book }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');

  const fetchReviews = async () => {
    const q = query(collection(db, 'reviews'), where('bookId', '==', book.key));
    const querySnapshot = await getDocs(q);
    const bookReviews = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReviews(bookReviews);
  };

  useEffect(() => {
    fetchReviews();
  }, [book]);

  const submitReview = async () => {
    if (user && reviewText) {
      await addDoc(collection(db, 'reviews'), {
        userId: user.uid,
        bookId: book.key,
        review: reviewText,
      });
      setReviewText('');
      fetchReviews();
    }
  };

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>{r.review}</li>
        ))}
      </ul>
      {user && (
        <div>
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          <button onClick={submitReview}>Submit Review</button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
