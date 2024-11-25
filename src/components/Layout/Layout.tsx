import React, { useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // ポップアップメニューの開閉状態
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // メニューの開閉をトグルする関数
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 relative">
            {/* ヘッダー */}
            <header className="bg-blue-500 text-white py-4 px-4 sm:px-8">
                <div className="container mx-auto flex justify-between items-center">
                    {/* アプリ名 */}
                    <div className="text-lg sm:text-xl font-bold">
                        本の蛹 - Book Cocoon
                    </div>

                    {/* メニューバー */}
                    <nav className="flex space-x-4">
                        <a href="/" className="hover:underline">
                            ホーム
                        </a>
                        <a href="/timer" className="hover:underline">
                            タイマー
                        </a>
                        <a href="/logs" className="hover:underline">
                            ログ
                        </a>
                    </nav>

                    {/* ポップアップメニュー */}
                    <button
                        onClick={toggleMenu}
                        className="absolute left-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                    >
                        メニュー
                    </button>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main
                className="flex-grow container mx-auto overflow-hidden"
                style={{ height: "calc(100vh - 64px)", marginTop: "-25px" }}
            >
                {children}
            </main>

            <div
                className={`absolute top-0 left-0 bg-white w-64 h-full shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                style={{ zIndex: 1000 }}
            >
                {/* メニュー内スクロール */}
                <div className="flex flex-col overflow-y-auto h-full">
                    <div className="px-4 py-2 border-b">
                        <h3 className="text-lg font-semibold">読む本の選択</h3>
                    </div>
                    {/* 本のリスト (例) */}
                    <div className="flex-1 overflow-y-auto">
                        <ul className="space-y-2 p-4">
                            <li className="hover:bg-gray-200 px-2 py-1 cursor-pointer">本1</li>
                            <li className="hover:bg-gray-200 px-2 py-1 cursor-pointer">本2</li>
                            <li className="hover:bg-gray-200 px-2 py-1 cursor-pointer">本3</li>
                            <li className="hover:bg-gray-200 px-2 py-1 cursor-pointer">本4</li>
                            {/* 必要な本のリストを追加 */}
                        </ul>
                    </div>
                    {/* 追加機能 */}
                    <div className="px-4 py-2 border-t">
                        <button className="w-full text-blue-500 hover:bg-blue-100 py-2 rounded-lg">
                            本を追加
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
