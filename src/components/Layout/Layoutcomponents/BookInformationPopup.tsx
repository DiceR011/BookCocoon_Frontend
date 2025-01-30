import React from "react";

// 書籍の型
interface Book {
    book_id: number;
    author: string;
    title: string;
    isbn: string;
    total_page: number;
}

interface BookInformationPopupProps {
    selectedBook: Book | null;
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
    if (!selectedBook) {
        return <div className="p-4">本の情報が見つかりません。</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
            <p className="text-sm text-gray-600">著者: {selectedBook.author}</p>
            <p className="text-sm text-gray-600">ISBN: {selectedBook.isbn}</p>
            <p className="text-sm text-gray-600">総ページ数: {selectedBook.total_page}ページ</p>
            
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
