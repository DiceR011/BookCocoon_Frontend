import React, { useState } from "react";
import axios from "axios";

import { Book } from "../../types/Book_type";
import { useBooksContext } from "../../Context/BooksContext/useBooksContext";

interface EditBookMenuProps {
    book: Book;
    onBack: () => void;
}

const EditBookMenu: React.FC<EditBookMenuProps> = ({ book, onBack }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author || "");
    const [isbn, setIsbn] = useState(book.isbn || "");
    const [totalPage, setTotalPage] = useState<number | "">(book.total_page);
    const [error, setError] = useState<string | null>(null);

    // 編集中と削除中のフラグ
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { setBooks } = useBooksContext();

    // 編集完了の処理（PUTリクエスト）
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!title.trim() || totalPage === "") {
            setError("タイトルと総ページ数は必須です。");
            return;
        }

        if (totalPage < 1 || !Number.isInteger(totalPage)) {
            setError("総ページ数は1以上の整数でなければなりません。");
            return;
        }

        setIsUpdating(true);

        const updatedBook = {
            title,
            author: author ? author.split(",").map(name => name.trim()).join(", ") : null,
            isbn: isbn || null,
            total_page: Number(totalPage),
        };

        try {
            await axios.put(`http://localhost:8000/books/${book.book_id}`, updatedBook, {
                headers: { "Content-Type": "application/json" },
            });

            setBooks(prevBooks => prevBooks.map(b => (b.book_id === book.book_id ? { ...b, ...updatedBook } : b)));

            alert("本の情報を更新しました！");
            onBack();
        } catch (err) {
            setError(err instanceof Error ? err.message : "エラーが発生しました。");
        } finally {
            setIsUpdating(false);
        }
    };

    // 本の削除処理（DELETEリクエスト）
    const handleDelete = async () => {
        if (!window.confirm("この本を削除しますか？")) return;

        setIsDeleting(true);

        try {
            await axios.delete(`http://localhost:8000/books/${book.book_id}`);
            setBooks(prevBooks => prevBooks.filter(b => b.book_id !== book.book_id));

            alert("本を削除しました！");
            onBack(); // 削除後に戻る
        } catch (err) {
            setError(err instanceof Error ? err.message : "エラーが発生しました。");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* 戻るボタン（左上） */}
            <button className="self-start text-blue-500 underline mb-4" onClick={onBack}>
                戻る
            </button>

            <form onSubmit={handleUpdate} className="p-6 pt-0 w-full">
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <label className="block mb-4">
                    <span className="text-gray-700">タイトル <span className="text-white text-sm m-1 px-0.5 bg-red-500 rounded-md">必須</span>:</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">著者 :</span>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">ISBN :</span>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">総ページ数 <span className="text-white text-sm m-1 px-0.5 bg-red-500 rounded-md">必須</span>:</span>
                    <input
                        type="number"
                        value={totalPage}
                        onChange={(e) => setTotalPage(e.target.value ? Number(e.target.value) : "")}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                {/* ボタンのコンテナ */}
                <div className="flex justify-between mt-6">
                    {/* 本を削除ボタン（左下） */}
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "処理中..." : "本を削除"}
                    </button>

                    {/* 本の編集完了ボタン（右下） */}
                    <button
                        type="submit"
                        className={`text-white py-2 px-4 rounded ${isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                        disabled={isUpdating}
                    >
                        {isUpdating ? "保存中..." : "編集完了"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBookMenu;
