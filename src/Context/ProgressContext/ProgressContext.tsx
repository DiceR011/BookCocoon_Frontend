import React, { createContext, useState, ReactNode } from "react";
import { Progress } from "../../types/Progress_type";

// Contextの型を定義
interface ProgressContextType {
    progress: Progress | null;
    setProgress: (progress: Progress | null) => void;
}

// デフォルト値
const ProgressContext = createContext<ProgressContextType>({
    progress: null,
    setProgress: () => {},
});

// ContextのProviderを定義
export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<Progress | null>(null);

    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};

export default ProgressContext;
