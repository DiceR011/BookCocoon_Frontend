import React, { useState } from "react";
import axios from "axios";
import { useBooksContext } from "../../../Context/BooksContext/useBooksContext";

interface ManualFormProps {
    onBack: () => void;
}

const ManualForm: React.FC<ManualFormProps> = ({ onBack }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [totalPage, setTotalPage] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { setBooks } = useBooksContext(); // setBooksを取得

    const handleSubmit = async (e: React.FormEvent) => {
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

        setLoading(true);

        const bookData = {
            title,
            author: author ? author.split(",").map(name => name.trim()).join(", ") : null,
            isbn: isbn || null,
            total_page: Number(totalPage),
        };

        try {
            // 本のデータを送信
            const response = await axios.post("http://localhost:8000/books", bookData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // 新しく追加された本のデータをBooksリストに追加
            setBooks(prevBooks => [...prevBooks, response.data]);

            // フォームのリセット
            setTitle("");
            setAuthor("");
            setIsbn("");
            setTotalPage("");

            alert("本を登録しました！");
        } catch (err) {
            setError(err instanceof Error ? err.message : "予期しないエラーが発生しました。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button className="self-start text-blue-500 underline mb-4" onClick={onBack}>
                戻る
            </button>
            <form onSubmit={handleSubmit} className="p-6 pt-0">
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <label className="block mb-4">
                    <span className="text-gray-700">タイトル <span className="text-white text-sm m-1 px-0.5 bg-red-500 rounded-md">必須</span>:</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="本のタイトルを入力"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">著者 :</span>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="山田太郎, 山田次郎"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">ISBN :</span>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        maxLength={17}
                        placeholder="000-0-000-00000-0"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">総ページ数 <span className="text-white text-sm m-1 px-0.5 bg-red-500 rounded-md">必須</span>:</span>
                    <input
                        type="number"
                        value={totalPage}
                        onChange={(e) => setTotalPage(e.target.value ? Number(e.target.value) : "")}
                        placeholder="ページ数を入力"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                <button
                    type="submit"
                    className={`w-full text-white py-2 px-4 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={loading}
                >
                    {loading ? "登録中..." : "本を登録"}
                </button>

                <p className="text-xs text-gray-500 mt-3">
                    * 必須項目は「必須」のマークがあります。<br />* 総ページ数は1以上の整数で入力。
                </p>
            </form>
        </div>
    );
};

export default ManualForm;
