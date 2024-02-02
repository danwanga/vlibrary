import React from "react";
import axios from "../../axios";

import React, { useState, useEffect } from "react";
import axios from "axios";

const BookDetail = ({ match }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookId = match.params.id;

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/book/${bookId}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [match.params.id]);

  return (
    <div>
      <h2>Book Details</h2>
      {loading ? (
        <p>Loading book details...</p>
      ) : book ? (
        <div>
          <h3>{book.name}</h3>
          <p>ISBN: {book.isbn}</p>
          <p>Author: {book.author.name}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};

export default BookDetail;
