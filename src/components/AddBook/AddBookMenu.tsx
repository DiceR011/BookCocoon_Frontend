import React, { useState } from "react";
import ISBNForm from "./forms/ISBNForm";
import ManualForm from "./forms/ManualForm";

const AddBookMenu: React.FC = () => {
    const [mode, setMode] = useState<"isbn" | "manual" | null>(null);

    const handleIsbnSubmit = (isbn: string) => {
        console.log("ISBNコードで本を登録:", isbn);
    };

    const handleManualSubmit = (title: string, author: string, publisher: string) => {
        console.log("手動で本を登録:", title, author, publisher);
    };

    return (
        <div className="flex items-center">
            {mode === null && (
                <div className="bg-white p-6 w-96">
                    <button
                        className="w-full bg-blue-500 text-white py-2 px-4 mb-4 rounded hover:bg-blue-600"
                        onClick={() => setMode("isbn")}
                    >
                        ISBNコードから登録
                    </button>
                    <button
                        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        onClick={() => setMode("manual")}
                    >
                        手動で登録
                    </button>
                </div>
            )}
            {mode === "isbn" && (
                <ISBNForm
                    onSubmit={handleIsbnSubmit}
                    onBack={() => setMode(null)}
                />
            )}
            {mode === "manual" && (
                <ManualForm
                    onSubmit={handleManualSubmit}
                    onBack={() => setMode(null)}
                />
            )}
        </div>
    );
};

export default AddBookMenu;
