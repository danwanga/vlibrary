import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../../axios";

const EditBookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    isbn: "",
    author_id: "",
  });
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    // Fetch the list of authors when the component mounts
    fetchAuthors();

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/book/${id}`);
        setBook(response.data["data"]);

        console.log(response.data["data"]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();

    setNewBook({
      name: book.name || "",
      isbn: book.isbn || "",
      author_id: book.author_id || "",
    });
  }, [id]);

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
      // Determine whether to send a POST or PUT request based on edit mode
      const apiEndpoint = `/book/${id}`;

      // Send a POST or PUT request to the appropriate endpoint with the new book data
      const response = await axios.post(apiEndpoint, newBook);

      if (!response.data) {
        throw new Error("Failed to save book details");
      }

      // Redirect to the /books route
      navigate("/books");
    } catch (error) {
      console.error("Error saving book details:", error);
      alert("Failed to save book details. Please try again.");
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>

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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBookForm;
