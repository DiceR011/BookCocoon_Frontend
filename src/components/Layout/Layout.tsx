// Layout.tsx
import React, { useState } from "react";
import Header from "./Layoutcomponents/Header";
import PopupMenu from "./Layoutcomponents/PopupMenu";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // メニューの開閉をトグルする関数
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 relative">
            {/* ヘッダー */}
            <Header onToggleMenu={toggleMenu} />

            {/* メインコンテンツ */}
            <main
                className="flex-grow container mx-auto overflow-hidden"
                style={{ height: "calc(100vh - 64px)", marginTop: "-25px" }}
            >
                {children}
            </main>

            {/* ポップアップメニュー */}
            <PopupMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
};

export default Layout;
