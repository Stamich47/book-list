import { useContext } from "react";
import BooksContext from "../context/BooksContext";

export default function useBooksContext() {
  return useContext(BooksContext);
}
