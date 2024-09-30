import { createContext, useState, useCallback } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const API_KEY = process.env.REACT_APP_BOOKS_API;

  const fetchGoogleBooks = async (title) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${API_KEY}`
    );
    return response.data.items.map((item) => {
      return {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        image: item.volumeInfo.imageLinks.thumbnail,
        id: item.id,
      };
    });
  };

  const addBook = (book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
    console.log(books);
  };

  const fetchBooks = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  }, []);

  const handleCreateBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", { title });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      } else {
        return book;
      }
    });
    setBooks(updatedBooks);
  };

  const valueToShare = {
    books,
    fetchBooks,
    handleCreateBook,
    deleteBookById,
    editBookById,
    fetchGoogleBooks,
    addBook,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksContext;
export { Provider };
