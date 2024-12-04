import React from "react";
import FullCalendar from "@fullcalendar/react"; // React版FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // 月間ビューのプラグイン

const Calender: React.FC = () => {
    return (
        <div className="p-4">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                dayCellClassNames={(info) => {
                    const day = info.date.getDay(); // 曜日を取得 (0:日曜日, 6:土曜日)
                    if (day === 0) return "bg-red-200 text-red-800"; // 日曜日のスタイル
                    if (day === 6) return "bg-blue-200 text-blue-800"; // 土曜日のスタイル
                    return "";
                }}
            />
        </div>
    );
}

export default Calender;
