// PopupMenu.tsx
import React, { useRef } from "react";
import BookList from "./BookList";
import AddBookButton from "./AddBookButton";

interface PopupMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ isOpen, onClose }) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    // 外部クリックでメニューを閉じる処理
    React.useEffect(() => {
        if (isOpen) {
            const handleClickOutside = (event: MouseEvent) => {
                if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                    onClose(); // メニューを閉じる
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, onClose]);

    return (
        <div
            ref={menuRef}
            className={`absolute top-0 left-0 bg-white w-64 h-full shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            style={{ zIndex: 1000 }}
        >
            <div className="flex flex-col overflow-y-auto h-full">
                <div className="px-4 py-2 border-b">
                    <h3 className="text-lg font-semibold">読む本の選択</h3>
                </div>

                {/* 本のリスト */}
                <BookList />

                {/* 本を追加するボタン */}
                <AddBookButton />
            </div>
        </div>
    );
};

export default PopupMenu;
