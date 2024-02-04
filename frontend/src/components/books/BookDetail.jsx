import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../axios";

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/book/${id}`);
        setBook(response.data["data"]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div>
      <h2 style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Book Details </span>
        <Link to="/books" className="list-detail-btn">
          Back to books
        </Link>
      </h2>
      {loading ? (
        <p>Loading book details...</p>
      ) : book ? (
        <div>
          <div className="list-table">
            <ul>
              <li>
                <span className="detail-item">Name:</span> {book.name}
              </li>
              <li>
                <span className="detail-item">ISBN:</span> {book.isbn}
              </li>
              <li>
                <span className="detail-item">Author:</span>
                {book && book.author ? book.author.name : "(Not Set)"}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};

export default BookDetail;
