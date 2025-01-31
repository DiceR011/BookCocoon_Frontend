import { useContext } from "react";
import { Book } from "../../types/Book_type";
import BooksContext from "./BooksContext";

// Contextの型を定義
interface BooksContextType {
    books: Book[];
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const useBooksContext = (): BooksContextType => {
    const context = useContext(BooksContext);
    if (!context) {
        throw new Error("useBooksContext must be used within a BooksProvider");
    }
    return context;
};