import React, { useState, useEffect } from "react";
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
            <li key={book.id}>
              {book.name}
              {/* by {book.author.name} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
