// Header.tsx
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

interface HeaderProps {
    onToggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleMenu }) => {
    return (
        <header className="bg-blue-500 text-white py-4 px-4 sm:px-8">
            <div className="mx-auto flex justify-between items-center">
                {/* アプリ名 */}
                <div className="text-lg sm:text-xl font-bold">
                    <button
                        onClick={onToggleMenu}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                    >
                        <MenuIcon />
                    </button>
                    <span className="hidden sm:inline">本の蛹 </span>- Book Cocoon
                </div>

                {/* メニューバー */}
                <nav className="flex space-x-4 sm:mr-20">
                    <Link to="/" className="hover:underline">
                        ホーム
                    </Link>
                    <Link to="/timer" className="hover:underline">
                        タイマー
                    </Link>
                    <Link to="/logs" className="hover:underline">
                        ログ
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
