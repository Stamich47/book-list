import { createContext, useState, useCallback } from "react";
import axios from "axios";
import defaultImage from "../images/defaultPhoto.png";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const API_KEY = process.env.REACT_APP_BOOKS_API;

  const fetchGoogleBooks = async (title) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${API_KEY}`
    );

    if (!response.data.items) {
      <h2>No Results Found</h2>;
      return [{ id: 0, title: "No Results Found 😞", image: defaultImage }];
    }

    return response.data.items.map((item) => {
      return {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        image: item.volumeInfo.imageLinks
          ? item.volumeInfo.imageLinks.thumbnail
          : defaultImage,
        id: item.id,
      };
    });
  };

  // *******POSTING AND GETTING DATA FROM LOCAL STORAGE*****
  const addBook = async (book) => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const newBook = {
      id: book.id,
      title: book.title,
      authors: book.authors,
      image: book.image,
      description: book.description,
    };
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    setBooks(books);
  };

  const fetchBooks = useCallback(async () => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(books);
  }, []);

  const deleteBookById = async (id) => {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(books));
    setBooks(books);
  };

  const editBookById = async (id, newTitle) => {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.map((book) => {
      if (book.id === id) {
        return { ...book, title: newTitle };
      }
      return book;
    });
    localStorage.setItem("books", JSON.stringify(books));
    setBooks(books);
  };

  // *******POSTING AND GETTING DATA FROM LOCALHOST*****
  // const addBook = async (book) => {
  //   const response = await axios.post("http://localhost:3001/books", {
  //     id: book.id,
  //     title: book.title,
  //     authors: book.authors,
  //     image: book.image,
  //     description: book.description,
  //   });
  //   setBooks([...books, response.data]);
  // };

  // const fetchBooks = useCallback(async () => {
  //   const response = await axios.get("http://localhost:3001/books");
  //   setBooks(response.data);
  // }, []);

  // const deleteBookById = async (id) => {
  //   await axios.delete(`http://localhost:3001/books/${id}`);

  //   const updatedBooks = books.filter((book) => {
  //     return book.id !== id;
  //   });
  //   setBooks(updatedBooks);
  // };

  // const editBookById = async (id, newTitle) => {
  //   const response = await axios.put(`http://localhost:3001/books/${id}`, {
  //     title: newTitle,
  //   });

  //   const updatedBooks = books.map((book) => {
  //     if (book.id === id) {
  //       return { ...book, ...response.data };
  //     } else {
  //       return book;
  //     }
  //   });
  //   setBooks(updatedBooks);
  // };

  const valueToShare = {
    books,
    fetchBooks,

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
