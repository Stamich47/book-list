import React from "react";
import { NavLink } from "react-router-dom";
import useBooksContext from "../hooks/use-books-context";

function Nav() {
  const { books } = useBooksContext();

  return (
    <div className="nav">
      <NavLink
        to="/booklist"
        className={({ isActive }) => (isActive ? "nav-tab active" : "nav-tab")}
      >
        My Booklist ({books.length})
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) => (isActive ? "nav-tab active" : "nav-tab")}
      >
        Search Books
      </NavLink>
    </div>
  );
}

export default Nav;
