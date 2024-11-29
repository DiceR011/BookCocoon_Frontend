import React from "react";
import ReactDOM from "react-dom";

interface PopupMenuProps {
    onClose: () => void;
    children: React.ReactNode;
}

const CenterPopupLayout: React.FC<PopupMenuProps> = ({ onClose, children }) => {
    // ポップアップの中身
    const popupContent = (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* 背景をクリックすると閉じる */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            ></div>

            {/* ポップアップ内容 */}
            <div
                className="bg-white rounded-lg p-6 shadow-lg w-80 z-50 relative"
                onClick={(e) => e.stopPropagation()} // 背景クリックイベントを伝播させない
            >
                {children}
            </div>
        </div>
    );

    // ポータルで body 直下にレンダリング
    return ReactDOM.createPortal(popupContent, document.body);
};

export default CenterPopupLayout;
