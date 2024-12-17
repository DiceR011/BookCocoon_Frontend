// BookList.tsx
import React, { useState }from "react";
import CenterPopupLayout from "./CenterPopupLayout";

const BookList: React.FC = () => {
    // ダミーデータとして本のリストを表示
    const books = ["本1", "本2", "本3", "本4"]; // ここでデータベースから本を取得する処理を追加できます。

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);

    const handleSelectBook = (book: string) => {
        setSelectedBook(book);
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        setSelectedBook(null);
    };

    return (
        <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-4">
                {books.map((book, index) => (
                    <li key={index} className="hover:bg-gray-200 px-2 py-1 cursor-pointer" onClick={() => handleSelectBook(book)}>
                        {book}
                    </li>
                ))}
            </ul>

            {isPopupVisible && (
                <CenterPopupLayout onClose={closePopup}>
                    {/* ポップアップの中身 */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">{selectedBook}</h2>
                        <p>ここに詳細情報を表示します。</p>
                        <button
                            onClick={closePopup}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            この本を読む
                        </button>
                    </div>
                </CenterPopupLayout>
            )}
        </div>
    );
};

export default BookList;
