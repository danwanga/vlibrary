import React, { useState, useEffect } from "react";
import axios from "../../axios";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of authors when the component mounts
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("/authors");

      setAuthors(response.data["data"]); // Assuming the response is an array of authors
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  return (
    <div className="list-table">
      <h2>All Authors</h2>
      {loading ? (
        <p>Loading authors...</p>
      ) : (
        <ul>
          {authors.map((authors) => (
            <li key={authors.id}>{authors.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorList;
