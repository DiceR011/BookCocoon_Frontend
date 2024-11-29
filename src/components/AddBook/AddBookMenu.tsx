import React, { useState } from "react";

// ISBNコードを使って本を登録するフォーム
const ISBNForm = ({ onSubmit }: { onSubmit: (isbn: string) => void }) => {
    const [isbn, setIsbn] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(isbn);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                ISBNコード:
                <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="ISBNコードを入力"
                />
            </label>
            <button type="submit">本を登録</button>
        </form>
    );
};

// 手動で本を登録するフォーム
const ManualForm = ({ onSubmit }: { onSubmit: (title: string, author: string, publisher: string) => void }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title, author, publisher);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                タイトル:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="本のタイトルを入力"
                />
            </label>
            <br />
            <label>
                著者:
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="著者名を入力"
                />
            </label>
            <br />
            <label>
                出版社:
                <input
                    type="text"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="出版社を入力"
                />
            </label>
            <br />
            <button type="submit">本を登録</button>
        </form>
    );
};

const AddBookMenu = () => {
    const [mode, setMode] = useState<"isbn" | "manual" | null>(null); // 登録方法の選択状態

    // ISBNコードから本を登録する処理
    const handleIsbnSubmit = (isbn: string) => {
        console.log("ISBNコードで本を登録:", isbn);
        // 国立国会図書館APIを使ってISBNコードから情報を取得し、データベースに保存する処理を追加
    };

    // 手動で本を登録する処理
    const handleManualSubmit = (title: string, author: string, publisher: string) => {
        console.log("手動で本を登録:", title, author, publisher);
        // データベースに手動で情報を追加する処理を追加
    };

    return (
        <div>
            {/* 登録方法選択 */}
            {mode === null && (
                <div>
                    <button onClick={() => setMode("isbn")}>ISBNコードから登録</button>
                    <button onClick={() => setMode("manual")}>手動で登録</button>
                </div>
            )}

            {/* ISBNコードで登録するフォーム */}
            {mode === "isbn" && <ISBNForm onSubmit={handleIsbnSubmit} />}

            {/* 手動で登録するフォーム */}
            {mode === "manual" && <ManualForm onSubmit={handleManualSubmit} />}
        </div>
    );
};

export default AddBookMenu;
