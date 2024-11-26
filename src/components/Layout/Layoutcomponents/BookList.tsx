// BookList.tsx
import React from "react";

const BookList: React.FC = () => {
    // ダミーデータとして本のリストを表示
    const books = ["本1", "本2", "本3", "本4"]; // ここでデータベースから本を取得する処理を追加できます。

    return (
        <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-4">
                {books.map((book, index) => (
                    <li key={index} className="hover:bg-gray-200 px-2 py-1 cursor-pointer">
                        {book}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
