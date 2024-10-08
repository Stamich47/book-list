import { useState } from "react";
import useBooksContext from "../hooks/use-books-context";

export default function BookEdit({ book, onSubmit }) {
  const { editBookById } = useBooksContext();

  const [title, setTitle] = useState(book.title);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editBookById(book.id, title);
    onSubmit();
  };

  return (
    <div>
      <form name="form" onSubmit={handleSubmit} className="book-edit">
        <label name="label">
          Title
          <input
            name="input"
            onChange={handleChange}
            value={title}
            className="input"
          />
        </label>
        <button name="button" type="submit" className="button is-primary">
          Save
        </button>
      </form>
    </div>
  );
}
