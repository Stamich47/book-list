import { useState } from "react";
import useBooksContext from "../hooks/use-books-context";

export default function BookCreate() {
  const { handleCreateBook, fetchGoogleBooks } = useBooksContext();

  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateBook(title);
    fetchGoogleBooks(title);
    setTitle("");
  };

  return (
    <div className="book-create">
      <h3>Add a Book</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            value={title}
            onChange={handleChange}
            type="text"
            name="title"
            className="input"
          />
        </label>

        <button type="submit" className="button">
          Create
        </button>
      </form>
    </div>
  );
}
