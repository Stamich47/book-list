import { useState } from "react";
import useBooksContext from "../hooks/use-books-context";

export default function BookSearch() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const { fetchGoogleBooks, addBook } = useBooksContext();

  const handleSearch = async () => {
    const results = await fetchGoogleBooks(title);
    setResults(results);
    setTitle("");
  };

  const handleEnterKeySearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddBook = (book) => {
    if (!book.id) {
      return;
    }
    addBook(book);
  };

  return (
    <div className="book-search">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleEnterKeySearch}
        placeholder="Enter Book Title..."
      />
      <button type="" onClick={handleSearch}>
        Search
      </button>
      <div className="book-results">
        {results.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => handleAddBook(book)}
          >
            <div>
              <h3>{book.title}</h3>
              <p>{book.authors?.join(", ")}</p>
            </div>
            {book.image && <img src={book.image} alt={book.title} />}
          </div>
        ))}
      </div>
    </div>
  );
}
