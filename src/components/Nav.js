import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="nav">
      <NavLink
        to="/booklist"
        className={({ isActive }) => (isActive ? "nav-tab active" : "nav-tab")}
      >
        My Booklist
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
