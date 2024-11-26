// AddBookButton.tsx
import React from "react";

const AddBookButton: React.FC = () => {
    const handleAddBook = () => {
        // 本を追加する処理をここで実装
        console.log("本を追加しました");
    };

    return (
        <div className="px-4 py-2 border-t">
            <button
                className="w-full text-blue-500 hover:bg-blue-100 py-2 rounded-lg"
                onClick={handleAddBook}
            >
                本を追加
            </button>
        </div>
    );
};

export default AddBookButton;
