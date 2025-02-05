import React, { useState, useEffect } from "react";
import { Book } from "../../../types/Book_type";
import CenterPopupLayout from "./CenterPopupLayout";
import EditBookMenu from "../../EditBook/EditBookMenu";
import { useProgressContext } from "../../../Context/ProgressContext/useProgressContext";
import axios from "axios";

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
    const { progress, setProgress } = useProgressContext();

    useEffect(() => {
        if (selectedBook?.book_id) {
            axios.get(`http://localhost:8000/books/${selectedBook.book_id}/progress`)
                .then(response => {
                    setProgress(response.data);
                })
                .catch(error => {
                    console.error("Error fetching book progress:", error);
                });
        }
    }, [setProgress, selectedBook?.book_id]); // ✅ ID の変更時のみ実行
    

    if (!selectedBook) {
        return <div className="p-4">本の情報が見つかりません。</div>;
    }

    const handleEditBook = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    }

    // 秒を「○時間○分○秒」に変換する関数
    const formatReadTime = (seconds: number | null | undefined) => {
        if (!seconds) return "0時間0分0秒";
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}時間${minutes}分${secs}秒`;
    };

// ISO形式の日時を「YYYY年MM月DD日 HH:MM」に変換する関数
    const formatDateTime = (isoString: string | null | undefined) => {
        if (!isoString) return "未設定";
        const date = new Date(isoString);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    };



    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
            <p className="text-sm text-gray-600">著者: {selectedBook.author}</p>
            <p className="text-sm text-gray-600">ISBN: {selectedBook.isbn}</p>
            <p className="text-sm text-gray-600">総ページ数: {selectedBook.total_page}ページ</p>
            <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="text-lg font-semibold">📖 現在の進捗状況</h3>
                <p className="text-sm text-gray-700">読書状況: {progress?.read_state || "未設定"}</p>
                <p className="text-sm text-gray-700">現在のページ: {progress?.current_page || 0} / {selectedBook.total_page} ページ</p>
                <p className="text-sm text-gray-700">総読書時間: <br/>{formatReadTime(progress?.read_time)}</p>
                <p className="text-sm text-gray-700">読書開始日時: <br/>{formatDateTime(progress?.start_date)}</p>
                <p className="text-sm text-gray-700">読書終了日時: <br/>{formatDateTime(progress?.finish_date)}</p>
            </div>


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
