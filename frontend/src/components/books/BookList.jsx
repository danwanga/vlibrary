import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of books when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/books");

      setBooks(response.data["data"]); // Assuming the response is an array of books
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  // console.log(books);
  // books.data.map((book) => console.log(book.name));

  return (
    <div className="list-table">
      <h2>Book List</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li
              key={book.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>
                {book.name}
                <strong
                  style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    paddingLeft: "5px",
                  }}
                >
                  by: {book && book.author ? book.author.name : "(Not Set)"}
                </strong>
              </span>

              <div
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Link to={`/book/${book.id}`} className="list-detail-btn">
                  Details
                </Link>
                {/* <Link
                  to={`/update-book/${book.id}`}
                  className="list-detail-btn"
                >
                  Edit
                </Link> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// {/* by {book.author.name} */}

export default BookList;
