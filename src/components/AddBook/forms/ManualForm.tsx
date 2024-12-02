import React, { useState } from "react";

interface ManualFormProps {
    onSubmit: (title: string, author: string, publisher: string) => void;
    onBack: () => void;
}

const ManualForm: React.FC<ManualFormProps> = ({ onSubmit, onBack }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title, author, publisher);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                className="self-start text-blue-500 underline mb-4"
                onClick={onBack}
            >
                戻る
            </button>
            <form onSubmit={handleSubmit} className="p-6 pt-0">
                <label className="block mb-4">
                    <span className="text-gray-700">タイトル:</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="本のタイトルを入力"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">著者:</span>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="著者名を入力"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">出版社:</span>
                    <input
                        type="text"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        placeholder="出版社を入力"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    本を登録
                </button>
            </form>
        </div>
    );
};

export default ManualForm;
