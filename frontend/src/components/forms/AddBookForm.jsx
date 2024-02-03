import React, { useState, useEffect } from "react";
import axios from "../../axios";

const AddBookForm = ({ onAddBook }) => {
  const [newBook, setNewBook] = useState({
    name: "",
    isbn: "",
    author_id: "",
  });

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Fetch the list of authors when the component mounts
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const response = await axios.get("/authors");
    setAuthors(response.data["data"]); // Assuming the response is an array of authors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form fields before submitting
    if (!newBook.name || !newBook.isbn || !newBook.author_id) {
      alert("Please fill in all the fields");
      return;
    }

    try {
      // Send a POST request to the /api/book endpoint with the new book data
      const response = await axios.post("/book", newBook);

      if (!response.data) {
        throw new Error("Failed to add book");
      }

      // Pass the added book data to the parent component
      onAddBook(response.data);

      // Reset the form after successful submission
      setNewBook({
        name: "",
        isbn: "",
        author_id: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Book Name:
          <input
            type="text"
            name="name"
            value={newBook.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            value={newBook.isbn}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Author:
          <select
            name="author_id"
            value={newBook.author_id}
            onChange={handleInputChange}
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
