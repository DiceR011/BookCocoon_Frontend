import React, { createContext, useState, ReactNode } from "react";
import { Book } from "../../types/Book_type";

// Contextの型を定義
interface ReadingBookContextType {
    readingBook: Book | null;
    setReadingBook: (book: Book | null) => void;
}

// デフォルト値
const ReadingBookContext = createContext<ReadingBookContextType>({
    readingBook: null,
    setReadingBook: () => {},
});

// ContextのProviderを定義
export const ReadingBookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [readingBook, setReadingBook] = useState<Book | null>(null);

    return (
        <ReadingBookContext.Provider value={{ readingBook, setReadingBook }}>
            {children}
        </ReadingBookContext.Provider>
    );
};

export default ReadingBookContext;
