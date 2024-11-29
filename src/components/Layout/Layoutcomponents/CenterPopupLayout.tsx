import React from "react";
import ReactDOM from "react-dom";

interface PopupMenuProps {
    onClose: () => void;
    children: React.ReactNode;
}

const CenterPopupLayout: React.FC<PopupMenuProps> = ({ onClose, children }) => {
    // ポップアップの中身
    const popupContent = (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-80 relative">
                {children}
            </div>
            {/* 背景をクリックすると閉じる */}
            <div
                className="absolute inset-0"
                onClick={onClose}
            ></div>
        </div>
    );

    // ポータルで body 直下にレンダリング
    return ReactDOM.createPortal(popupContent, document.body);
};

export default CenterPopupLayout;

