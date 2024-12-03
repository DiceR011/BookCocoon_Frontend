import React, { useState } from "react";
import CenterPopupLayout from "./CenterPopupLayout";
import AddBookMenu from "../../AddBook/AddBookMenu";

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
                    <AddBookMenu />
                </CenterPopupLayout>
            )}
        </div>
    );
};

export default AddBookButton;
