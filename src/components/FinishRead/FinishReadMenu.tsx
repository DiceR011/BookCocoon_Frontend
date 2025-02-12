import React, { useState } from "react";
import axios from "axios";
import { useReadingBookContext } from "../../Context/ReadingBookContext/useReadingBookContext";

interface FinishReadMenuProps {
    readTime: number;
}

const FinishReadMenu: React.FC<FinishReadMenuProps> = ({ readTime }) => {
    const { readingBook } = useReadingBookContext(); // 現在読んでいる本の情報

    const [currentPage, setCurrentPage] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (currentPage === "" || currentPage < 1 || !Number.isInteger(currentPage)) {
            setError("現在のページは1以上の整数で入力してください。");
            return;
        }

        if (readingBook && currentPage > readingBook.total_page) {
            setError(`現在のページ数は最大 ${readingBook.total_page} ページまでです。`);
            return;
        }

        setLoading(true);

        try {
            const readState =
                currentPage === readingBook?.total_page ? "Finished" : "Reading";

            const progressData = {
                current_page: currentPage,
                read_time: readTime,
                read_state: readState,
            };

            // サーバーに進捗データを送信 (PATCH メソッド)
            await axios.patch(
                `http://localhost:8000/books/${readingBook?.book_id}/progress`,
                progressData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            
            alert("進捗を更新しました！");
            setCurrentPage(""); // フォームのリセット
        } catch (err) {
            setError(err instanceof Error ? err.message : "予期しないエラーが発生しました。");
        } finally {
            setLoading(false);
        }
    };

    if (!readingBook) {
        return <p>現在読んでいる本が選択されていません。</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">読書進捗を記録</h2>
            <p className="text-sm text-gray-500 mb-4">
                現在読んでいる本: <span className="font-semibold">{readingBook.title}</span>{" "}
                （全 {readingBook.total_page} ページ）
            </p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="p-6 pt-0 w-full max-w-md">
                <label className="block mb-4">
                    <span className="text-gray-700">現在のページ数 :</span>
                    <input
                        type="number"
                        value={currentPage}
                        onChange={(e) =>
                            setCurrentPage(e.target.value ? Number(e.target.value) : "")
                        }
                        placeholder="現在のページを入力"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                <button
                    type="submit"
                    className={`w-full text-white py-2 px-4 rounded ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "更新中..." : "進捗を保存"}
                </button>
            </form>
        </div>
    );
};

export default FinishReadMenu;
