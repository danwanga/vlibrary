import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../axios";

const AuthorDetail = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(`/author/${id}`);
        setAuthor(response.data["data"]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author details:", error);
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [id]);

  return (
    <div>
      <h2 style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Author Details </span>
        <Link to="/authors" className="list-detail-btn">
          Back to authors
        </Link>
      </h2>
      {loading ? (
        <p>Loading author details...</p>
      ) : author ? (
        <div>
          <div className="list-table">
            <ul>
              <li>
                <span className="detail-item">Name:</span> {author.name}
              </li>
              <li>
                <span className="detail-item">Gender:</span> {author.gender}
              </li>
              <li>
                <span className="detail-item">Age:</span> {author.age}
              </li>
              <li>
                <span className="detail-item">Country:</span> {author.country}
              </li>
              <li>
                <span className="detail-item">Genre:</span> {author.genre}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Author not found</p>
      )}
    </div>
  );
};

export default AuthorDetail;
