import BookShow from "./BookShow";
import useBooksContext from "../hooks/use-books-context";

export default function BookList() {
  const { books } = useBooksContext();

  if (!books.length) {
    return <div className="no-books">No Books on your book shelf.</div>;
  }

  const renderedBooks = books.map((book) => (
    <BookShow key={book.id} book={book} />
  ));

  return <div className="book-list">{renderedBooks}</div>;
}
