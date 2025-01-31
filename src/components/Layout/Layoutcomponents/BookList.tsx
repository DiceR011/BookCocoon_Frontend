import React, { useState, useEffect } from "react";
import CenterPopupLayout from "./CenterPopupLayout";
import BookInformationPopup from "./BookInformationPopup";
import { useBooksContext } from "../../../Context/BooksContext/useBooksContext";
import { useReadingBookContext } from "../../../Context/ReadingBookContext/useReadingBookContext";
import axios from "axios";

const BookList: React.FC = () => {
    const { books, setBooks } = useBooksContext();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedBookID, setSelectedBookID] = useState<number | null>(null);
    const { readingBook, setReadingBook } = useReadingBookContext();

    // 本を選択したときの処理
    const handleSelectBook = (book_id: number) => {
        setSelectedBookID(book_id);
        setIsPopupVisible(true);
    };

    // 本を選んだ後のポップアップを閉じる処理
    const closePopup = () => {
        setIsPopupVisible(false);
    };

    // 選択された本を取得
    const selectedBook = books.find(book => book.book_id === selectedBookID) || null;

    // 本を読む状態にする処理
    const handleReadBook = () => {
        closePopup();
        if (selectedBook) {
            setReadingBook(selectedBook); // 選択した本の情報をコンテキストにセット
        }
    };

    // 本の選択を解除する処理
    const handleDeselectBook = () => {
        closePopup();
        setReadingBook(null); // 選択をリセット
    };

    // ReactのuseEffectでデータを取得
    useEffect(() => {
        axios.get("http://localhost:8000/books")
            .then(response => {
                setBooks(response.data); // すべての本のデータをセット
            })
            .catch(error => {
                console.error("Error fetching books:", error);
            });
    }, [setBooks]);

    return (
        <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-4">
                {books.map((book) => (
                    <li
                        key={book.book_id}
                        className={`px-2 py-1 cursor-pointer ${
                            readingBook?.book_id === book.book_id ? "bg-blue-100" : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleSelectBook(book.book_id)}
                    >
                        {book.title}{" "}
                        {readingBook?.book_id === book.book_id && (
                            <span className="text-sm px-1 text-blue-500">(選択中)</span>
                        )}
                    </li>
                ))}
            </ul>

            {isPopupVisible && selectedBook && (
                <CenterPopupLayout onClose={closePopup}>
                    <BookInformationPopup
                        selectedBook={selectedBook}
                        isReading={readingBook?.book_id === selectedBook.book_id}
                        onReadBook={handleReadBook}
                        onDeselectBook={handleDeselectBook}
                    />
                </CenterPopupLayout>
            )}
        </div>
    );
};

export default BookList;
