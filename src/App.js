import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BookSearch from "./components/BookSearch";
import useBooksContext from "./hooks/use-books-context";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import logo from "./images/BookBuddyLogo_tsp.png";

import "./App.css";

function App() {
  const { fetchBooks } = useBooksContext();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <Router>
      <div className="app">
        <img src={logo} alt="Book Buddy Logo" className="logo" />
        <Nav />
        <Routes>
          <Route path="/booklist" element={<BookList />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/" element={<BookList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
