import React, { useState, useEffect } from "react";
import CenterPopupLayout from "./CenterPopupLayout";
import BookInformationPopup from "./BookInformationPopup";
import { useReadingBookContext } from "../../../Context/ReadingBookContext";
import axios from "axios";

const BookList: React.FC = () => {
    const [books, setBooks] = useState<{ book_id: number; author: string; title: string; isbn: string; total_page: number;}[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<number | null>(null);
    const { readingBook, setReadingBook } = useReadingBookContext();

    // 本を選択したときの処理
    const handleSelectBook = (book_id: number) => {
        setSelectedBook(book_id);
        setIsPopupVisible(true);
    };

    // 本を選んだ後のポップアップを閉じる処理
    const closePopup = () => {
        setIsPopupVisible(false);
    };

    // 本を読む状態にする処理
    const handleReadBook = () => {
        closePopup();
        setReadingBook(selectedBook); // book_idをset
    };

    // 本の選択を解除する処理
    const handleDeselectBook = () => {
        closePopup();
        setReadingBook(null); // nullにリセット
    };

    // ReactのuseEffectでデータを取得
    useEffect(() => {
        // FastAPIのエンドポイントから書籍情報を取得
        axios.get("http://localhost:8000/books") // FastAPIのURLに合わせる
            .then(response => {
                // レスポンスからbook_idとtitleを抽出して状態にセット
                setBooks(response.data.map((book: { book_id: string; title: string }) => ({
                    book_id: book.book_id,
                    title: book.title,
                })));
            })
            .catch(error => {
                console.error("Error fetching books:", error);
            });
    }, []);

    return (
        <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-4">
                {books.map((book) => (
                    <li
                        key={book.book_id} // book_idをkeyとして使用
                        className={`px-2 py-1 cursor-pointer ${
                            readingBook === book.book_id ? "bg-blue-100" : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleSelectBook(book.book_id)}
                    >
                        {book.title}{" "}
                        {readingBook === book.book_id && (
                            <span className="text-sm px-1 text-blue-500">(選択中)</span>
                        )}
                    </li>
                ))}
            </ul>

            {isPopupVisible && (
                <CenterPopupLayout onClose={closePopup}>
                    <BookInformationPopup
                        books = {books}
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
