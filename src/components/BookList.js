import BookShow from "./BookShow";
import { useContext } from "react";
import BooksContext from "../context/BooksContext";

export default function BookList() {
  const { books } = useContext(BooksContext);

  const renderedBooks = books.map((book) => (
    <BookShow key={book.id} book={book} />
  ));

  return <div className="book-list">{renderedBooks}</div>;
}
