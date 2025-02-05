import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomeLayout } from "./components/index"
import { TimerLayout } from "./components/index"
import { LogsLayout } from "./components/index";
import { ReadingBookProvider } from "./Context/ReadingBookContext/ReadingBookContext";
import { BooksProvider } from "./Context/BooksContext/BooksContext";
import { ProgressProvider } from "./Context/ProgressContext/ProgressContext";
import { ReadingProgressProvider } from "./Context/ReadingProgressContext/ProgressContext";


const App: React.FC = () => {
    return (
        <ReadingProgressProvider>
            <ProgressProvider>
                <BooksProvider>
                    <ReadingBookProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<HomeLayout />}/>
                                <Route path="/timer" element={<TimerLayout />} />
                                <Route path="/logs" element={<LogsLayout />} />
                            </Routes>
                        </BrowserRouter>
                    </ReadingBookProvider>
                </BooksProvider>
            </ProgressProvider>
        </ReadingProgressProvider>
    );
};

export default App;
