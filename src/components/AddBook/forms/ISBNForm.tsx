import React, { useState } from "react";
import axios from "axios";
import { useBooksContext } from "../../../Context/BooksContext/useBooksContext";

interface ISBNFormProps {
    onBack: () => void;
}

const ISBNForm: React.FC<ISBNFormProps> = ({ onBack }) => {
    const [isbn, setIsbn] = useState("");
    const [bookData, setBookData] = useState<{
        title: string;
        author: string;
        totalPage: number;
        isbn: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { setBooks } = useBooksContext();

    const fetchBookInfo = async (isbn: string) => {
        try {
            setLoading(true);
            setError(null);

            // 新しいAPIエンドポイントを使って書籍情報を取得
            const response = await axios.get(`http://localhost:8000/library/${isbn}`);

            // レスポンスからデータを抽出
            const { title, author, total_page, isbn: bookIsbn } = response.data; // レスポンスが配列であるため[0]を使用

            if (title && author && total_page) {
                setBookData({
                    title,
                    author,
                    totalPage: total_page,
                    isbn: bookIsbn,
                });
            } else {
                setError("書籍情報の取得に失敗しました。");
            }
        } catch (err) {
            setError("APIの取得に失敗しました。");
        } finally {
            setLoading(false);
        }
    };

    const handleIsbnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newIsbn = e.target.value;
        setIsbn(newIsbn);

        if (newIsbn.length === 13) {
            fetchBookInfo(newIsbn); // ISBNコードが13桁のときに情報を取得
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!bookData) {
            setError("本の情報が不足しています。ISBNを再確認してください。");
            return;
        }

        setLoading(true);
        try {
            const { title, author, totalPage, isbn } = bookData;

            // データをデータベースに送信
            const response = await axios.post("http://localhost:8000/books", {
                title,
                author,
                isbn,
                total_page: totalPage,
            });

            setBooks((prevBooks) => [...prevBooks, response.data]);
            alert("本を登録しました！");
            setIsbn("");
            setBookData(null);
        } catch (err) {
            setError("データの登録に失敗しました。");
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
                <label className="block mb-4">
                    <span className="text-gray-700">ISBNコード:</span>
                    <input
                        type="text"
                        value={isbn}
                        onChange={handleIsbnChange}
                        placeholder="ISBNコードを入力"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>

                {bookData && (
                    <div className="mb-4">
                        <p>
                            <strong>タイトル:</strong> {bookData.title}
                        </p>
                        <p>
                            <strong>著者:</strong> {bookData.author}
                        </p>
                        <p>
                            <strong>ISBN:</strong> {bookData.isbn}
                        </p>
                        <p>
                            <strong>総ページ数:</strong> {bookData.totalPage}
                        </p>
                    </div>
                )}

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    className={`w-full text-white py-2 px-4 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={loading}
                >
                    {loading ? "登録中..." : "本を登録"}
                </button>

                <p className="text-xs text-gray-500 mt-3">
                    * ISBNコードはハイフン抜きで、13文字の数字を入力してください。
                </p>
            </form>
        </div>
    );
};

export default ISBNForm;
