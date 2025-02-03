import React, { useState } from "react";
import { Book } from "../../../types/Book_type";
import CenterPopupLayout from "./CenterPopupLayout";
import EditBookMenu from "../../EditBook/EditBookMenu";

interface BookInformationPopupProps {
    selectedBook: Book | null;
    selectedBookId: number;
    isReading: boolean;
    onReadBook: () => void;
    onDeselectBook: () => void;
}

const BookInformationPopup: React.FC<BookInformationPopupProps> = ({
    selectedBook,
    isReading,
    onReadBook,
    onDeselectBook,
}) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    if (!selectedBook) {
        return <div className="p-4">本の情報が見つかりません。</div>;
    }

    const handleEditBook = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    }


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
            <p className="text-sm text-gray-600">著者: {selectedBook.author}</p>
            <p className="text-sm text-gray-600">ISBN: {selectedBook.isbn}</p>
            <p className="text-sm text-gray-600">総ページ数: {selectedBook.total_page}ページ</p>

            {/* ボタンを横並びにするためのコンテナ */}
            <div className="flex justify-between mt-4">
                {/* 左側：編集ボタン */}
                <button
                    onClick={handleEditBook}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-20"
                >
                    編集
                </button>

                {isPopupVisible && (
                    <CenterPopupLayout onClose={closePopup}>
                        <EditBookMenu 
                            book={selectedBook}
                            onBack={closePopup}
                        />
                    </CenterPopupLayout>
                )}

                {/* 右側：選択解除 or 読むボタン */}
                {isReading ? (
                    <button
                        onClick={onDeselectBook}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        選択解除
                    </button>
                ) : (
                    <button
                        onClick={onReadBook}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        この本を読む
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookInformationPopup;
