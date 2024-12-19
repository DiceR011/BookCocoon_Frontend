// ReadingBookContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Contextの型を定義
interface ReadingBookContextType {
    readingBook: string | null;
    setReadingBook: (book: string | null) => void;
}

// デフォルト値
const ReadingBookContext = createContext<ReadingBookContextType>({
    readingBook: null,
    setReadingBook: () => { },
});

// ContextのProviderを定義
export const ReadingBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [readingBook, setReadingBook] = useState<string | null>(null);

    return (
        <ReadingBookContext.Provider value={{ readingBook, setReadingBook }}>
            {children}
        </ReadingBookContext.Provider>
    );
};

// Contextを使うためのカスタムフック
export const useReadingBookContext = () => useContext(ReadingBookContext);
