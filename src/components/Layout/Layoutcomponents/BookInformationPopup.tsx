import React from "react";

interface BookInformationPopupProps {
    selectedBook: string | null;
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
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{selectedBook}</h2>
            <p>ここに詳細情報を表示します。</p>
            {isReading ? (
                <button
                    onClick={onDeselectBook}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    選択解除
                </button>
            ) : (
                <button
                    onClick={onReadBook}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    この本を読む
                </button>
            )}
        </div>
    );
};

export default BookInformationPopup;
