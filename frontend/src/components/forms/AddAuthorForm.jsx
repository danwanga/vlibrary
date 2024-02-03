import React, { useState } from "react";
import axios from "../../axios";

const AddAuthorForm = ({ onAddAuthor }) => {
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    gender: "",
    age: "",
    country: "",
    genre: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form fields before submitting
    if (
      !newAuthor.name ||
      !newAuthor.gender ||
      !newAuthor.age ||
      !newAuthor.country ||
      !newAuthor.genre
    ) {
      alert("Please fill in all the fields");
      return;
    }

    try {
      // Send a POST request to the /api/author endpoint with the new author data
      const response = await axios.post("/author", newAuthor);

      if (!response.data) {
        throw new Error("Failed to add author");
      }

      // Pass the added author data to the parent component
      onAddAuthor(response.data);

      // Reset the form after successful submission
      setNewAuthor({
        name: "",
        gender: "",
        age: "",
        country: "",
        genre: "",
      });
    } catch (error) {
      console.error("Error adding author:", error);
      alert("Failed to add author. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add New Author</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Author Name:
          <input
            type="text"
            name="name"
            value={newAuthor.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={newAuthor.gender}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={newAuthor.age}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={newAuthor.country}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={newAuthor.genre}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add Author</button>
      </form>
    </div>
  );
};

export default AddAuthorForm;
