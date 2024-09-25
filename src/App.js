import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const handleCreateBook = (title) => {
    const generateID = Math.round(Math.random() * 9999);

    const updatedBooks = [...books, { id: generateID, title }];
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <BookList books={books} />
      <BookCreate onCreateBook={handleCreateBook} />
    </div>
  );
}

export default App;
