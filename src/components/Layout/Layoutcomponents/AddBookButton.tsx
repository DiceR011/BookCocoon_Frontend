import React, { useState } from "react";
import CenterPopupLayout from "./CenterPopupLayout";

const AddBookButton: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleAddBook = () => {
        setIsPopupVisible(true); // ポップアップを表示
    };

    const closePopup = () => {
        setIsPopupVisible(false); // ポップアップを閉じる
    };

    return (
        <div className="px-4 py-2 border-t">
            <button
                className="w-full text-blue-500 hover:bg-blue-100 py-2 rounded-lg"
                onClick={handleAddBook}
            >
                本を追加
            </button>

            {isPopupVisible && (
                <CenterPopupLayout onClose={closePopup}>
                    <h2 className="text-xl font-bold mb-4">本を追加</h2>
                    <p>ここに追加フォームを作成してください。</p>
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-200 text-white px-4 py-2 rounded-lg"
                        onClick={closePopup}
                    >
                        閉じる
                    </button>
                </CenterPopupLayout>
            )}
        </div>
    );
};

export default AddBookButton;
