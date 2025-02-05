import React, { createContext, useState, ReactNode } from "react";
import { Progress } from "../../types/Progress_type";

// Contextの型を定義
interface ReadingProgressContextType {
    readingProgress: Progress | null;
    setReadingProgress: (progress: Progress | null) => void;
}

// デフォルト値
const ReadingProgressContext = createContext<ReadingProgressContextType>({
    readingProgress: null,
    setReadingProgress: () => {},
});

// ContextのProviderを定義
export const ReadingProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [readingProgress, setReadingProgress] = useState<Progress | null>(null);

    return (
        <ReadingProgressContext.Provider value={{ readingProgress, setReadingProgress }}>
            {children}
        </ReadingProgressContext.Provider>
    );
};

export default ReadingProgressContext;
