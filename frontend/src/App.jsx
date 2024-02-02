import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import BookList from "./components/books/BookList";
import AuthorList from "./components/authors/AuthorList";
import AddBookForm from "./components/forms/AddBookForm";
import AddAuthorForm from "./components/forms/AddAuthorForm";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/books" element={<BookList />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/add-book" element={<AddBookForm />} />
          <Route path="/add-author" element={<AddAuthorForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const Home = () => {
  return <h2>Welcome to the Virtual Library</h2>;
};

export default App;
