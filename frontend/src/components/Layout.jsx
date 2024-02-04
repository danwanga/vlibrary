import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ message, children }) => {
  return (
    <div className="container">
      <header>
        <h1>Virtual Library</h1>
      </header>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link to="/add-book">Add Book</Link>
          </li>
          <li>
            <Link to="/add-author">Add Author</Link>
          </li>
        </ul>
      </nav>

      <main>
        {message && <div className="message">{message}</div>}
        {children}
      </main>
    </div>
  );
};

export default Layout;
