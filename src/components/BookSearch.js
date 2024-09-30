import { useState } from "react";
import useBooksContext from "../hooks/use-books-context";

export default function BookSearch() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const { fetchGoogleBooks, addBook } = useBooksContext();

  const handleSearch = async () => {
    const results = await fetchGoogleBooks(title);
    setResults(results);
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
        placeholder="Enter Book Title..."
      />
      <button onClick={handleSearch}>Search</button>
      <div className="book-results">
        {results.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => handleAddBook(book)}
          >
            <h3>{book.title}</h3>
            <p>{book.authors?.join(", ")}</p>
            {book.image && <img src={book.image} alt={book.title} />}
          </div>
        ))}
      </div>
    </div>
  );
}
