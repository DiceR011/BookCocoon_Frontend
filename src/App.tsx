import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomeLayout } from "./components/index"
import { TimerLayout } from "./components/index"
import { LogsLayout } from "./components/index";
import { ReadingBookProvider } from "./Context/ReadingBookContext";

const App: React.FC = () => {
    return (
        <ReadingBookProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLayout />}/>
                    <Route path="/timer" element={<TimerLayout />} />
                    <Route path="/logs" element={<LogsLayout />} />
                </Routes>
            </BrowserRouter>
        </ReadingBookProvider>
    );
};

export default App;
