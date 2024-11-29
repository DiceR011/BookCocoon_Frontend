import React from "react";

interface PopupMenuProps {
    onClose: () => void;
    children: React.ReactNode;
}

const CenterPopupLayout: React.FC<PopupMenuProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                {children}
            </div>
            <div
                className="absolute inset-0"
                onClick={onClose}
            ></div>
        </div>
    );
};

export default CenterPopupLayout;
