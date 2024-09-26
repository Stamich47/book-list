import { useState } from "react";

export default function BookEdit({ book, onSubmit }) {
  const [title, setTitle] = useState(book.title);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book.id, title);
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
