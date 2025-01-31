import React, { useState } from "react";
import ISBNForm from "./forms/ISBNForm";
import ManualForm from "./forms/ManualForm";

const AddBookMenu: React.FC = () => {
    const [mode, setMode] = useState<"isbn" | "manual" | null>(null);

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
                    onBack={() => setMode(null)}
                />
            )}
            {mode === "manual" && (
                <ManualForm
                    onBack={() => setMode(null)}
                />
            )}
        </div>
    );
};

export default AddBookMenu;
