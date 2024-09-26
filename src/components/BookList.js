import BookShow from "./BookShow";

export default function BookList({ books, onDelete, onEditBook }) {
  const renderedBooks = books.map((book) => (
    <BookShow
      key={book.id}
      book={book}
      onDelete={onDelete}
      onEditBook={onEditBook}
    />
  ));

  return <div className="book-list">{renderedBooks}</div>;
}
