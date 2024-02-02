import React, { useState, useEffect } from "react";
import axios from "../../axios";

const AuthorDetail = ({ match }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorId = match.params.id;

    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(`/author/${authorId}`);
        setAuthor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author details:", error);
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [match.params.id]);

  return (
    <div>
      <h2>Author Details</h2>
      {loading ? (
        <p>Loading author details...</p>
      ) : author ? (
        <div>
          <h3>{author.name}</h3>
          <p>Gender: {author.gender}</p>
          <p>Age: {author.age}</p>
          <p>Country: {author.country}</p>
          <p>Genre: {author.genre}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Author not found</p>
      )}
    </div>
  );
};

export default AuthorDetail;
