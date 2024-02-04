import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
            <li
              key={authors.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>{authors.name}</span>
              <Link to={`/author/${authors.id}`} className="list-detail-btn">
                Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorList;
