import React, { createContext, useState, ReactNode } from "react";
import { Book } from "../../types/Book_type";

// Contextの型を定義
interface BooksContextType {
    books: Book[];
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

// デフォルト値を指定（空の配列）
const BooksContext = createContext<BooksContextType | undefined>(undefined);

// Providerを定義
export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [books, setBooks] = useState<Book[]>([]);

    return (
        <BooksContext.Provider value={{ books, setBooks }}>
            {children}
        </BooksContext.Provider>
    );
};

export default BooksContext