import React, { useState } from "react";

interface ISBNFormProps {
    onSubmit: (isbn: string) => void;
    onBack: () => void;
}

const ISBNForm: React.FC<ISBNFormProps> = ({ onSubmit, onBack }) => {
    const [isbn, setIsbn] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(isbn);
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
                    <span className="text-gray-700">ISBNコード:</span>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        placeholder="ISBNコードを入力"
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

export default ISBNForm;
