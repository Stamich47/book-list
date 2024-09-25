import { useState } from "react";
import BookCreate from "./components/BookCreate";

function App() {
  const [books, setBooks] = useState([]);

  const handleCreateBook = (title) => {
    setBooks((prevBooks) => [...prevBooks, { title }]);
  };

  return (
    <div>
      <BookCreate onCreateBook={handleCreateBook} />
    </div>
  );
}

export default App;
