import React, { useState, useEffect } from "react";
import CenterPopupLayout from "./CenterPopupLayout";
import BookInformationPopup from "./BookInformationPopup";
import { useReadingBookContext } from "../../../Context/ReadingBookContext";

const BookList: React.FC = () => {
    const books = ["本1", "本2", "本3", "本4"];
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const { readingBook, setReadingBook } = useReadingBookContext();

    const handleSelectBook = (book: string) => {
        setSelectedBook(book);
        setIsPopupVisible(true);
    };

    useEffect(() => {
        console.log("Selected book:", selectedBook);
    }, [selectedBook]);

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const handleReadBook = () => {
        closePopup();
        setReadingBook(selectedBook);
    };

    const handleDeselectBook = () => {
        closePopup();
        setReadingBook(null);
    };

    useEffect(() => {
        console.log("Reading book:", readingBook);
    }, [readingBook]);

    return (
        <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-4">
                {books.map((book, index) => (
                    <li
                        key={index}
                        className={`px-2 py-1 cursor-pointer ${
                            readingBook === book ? "bg-blue-100" : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleSelectBook(book)}
                    >
                        {book}{" "}
                        {readingBook === book && (
                            <span className="text-sm px-1 text-blue-500">(選択中)</span>
                        )}
                    </li>
                ))}
            </ul>

            {isPopupVisible && (
                <CenterPopupLayout onClose={closePopup}>
                    <BookInformationPopup
                        selectedBook={selectedBook}
                        isReading={readingBook === selectedBook}
                        onReadBook={handleReadBook}
                        onDeselectBook={handleDeselectBook}
                    />
                </CenterPopupLayout>
            )}
        </div>
    );
};

export default BookList;
