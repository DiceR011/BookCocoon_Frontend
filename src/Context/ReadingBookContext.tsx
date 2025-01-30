import React, { createContext, useState, useContext } from "react";

// 書籍の型を定義
interface Book {
    book_id: number;
    author: string;
    title: string;
    isbn: string;
    total_page: number;
}

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
export const ReadingBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [readingBook, setReadingBook] = useState<Book | null>(null);

    return (
        <ReadingBookContext.Provider value={{ readingBook, setReadingBook }}>
            {children}
        </ReadingBookContext.Provider>
    );
};

// Contextを使うためのカスタムフック
export const useReadingBookContext = () => useContext(ReadingBookContext);
