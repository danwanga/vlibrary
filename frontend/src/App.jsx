import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import BookList from "./components/books/BookList";
import BookDetail from "./components/books/BookDetail";
import AuthorList from "./components/authors/AuthorList";
import AuthorDetail from "./components/authors/AuthorDetail";
import AddBookForm from "./components/forms/AddBookForm";
import EditBookForm from "./components/forms/EditBookForm";
import AddAuthorForm from "./components/forms/AddAuthorForm";

import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");

  const handleAddAuthor = (event) => {
    event.preventDefault();
    onAddAuthor(newAuthor);
    // Then set the success message
    setMessage("Details added successfully!");
  };

  return (
    <Router>
      <Layout message={message}>
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/author/:id" element={<AuthorDetail />} />
          <Route
            path="/add-book"
            element={<AddBookForm onAddAuthor={handleAddAuthor} />}
          />
          <Route path="/update-book/:id" element={<EditBookForm />} />
          <Route path="/add-author" element={<AddAuthorForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Virtual Library</h2>

      <div className="grid-container">&nbsp;</div>
    </div>
  );
};

export default App;
