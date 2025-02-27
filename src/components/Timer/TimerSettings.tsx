import { useState } from "react";
import CenterPopupLayout from "../Layout/Layoutcomponents/CenterPopupLayout";
import FinishReadMenu from "../FinishRead/FinishReadMenu";

interface TimerSettingsProps {
    newWorkMinutes: number;
    newWorkSeconds: number;
    setNewWorkMinutes: (value: number) => void;
    setNewWorkSeconds: (value: number) => void;
    newBreakMinutes: number;
    newBreakSeconds: number;
    setNewBreakMinutes: (value: number) => void;
    setNewBreakSeconds: (value: number) => void;
    applyChanges: () => void;
    isRunning: boolean;
    isReading: boolean;
    readTime: number;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({
    newWorkMinutes,
    newWorkSeconds,
    setNewWorkMinutes,
    setNewWorkSeconds,
    newBreakMinutes,
    newBreakSeconds,
    setNewBreakMinutes,
    setNewBreakSeconds,
    applyChanges,
    isRunning,
    isReading,
    readTime
}) => {
    const [ isPopupVisible, setIsPopupVisible ] = useState(false);

    const handleFinishRead = () => {
        setIsPopupVisible(true); // ポップアップを表示
        console.log(readTime)
    };

    const closePopup = () => {
        setIsPopupVisible(false); // ポップアップを閉じる
    };

    return (
        <div className="mt-3 sm:mt-6 px-4 sm:px-8">
            <h2 className="text-lg font-semibold text-gray-700">設定</h2>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-6 mt-4">
                {/* 作業時間設定 */}
                <div>
                    <label className="block text-gray-600 font-medium">作業時間 (分:秒)</label>
                    <div className="flex space-x-2 mt-2 items-center">
                        <input
                            type="number"
                            value={newWorkMinutes}
                            onChange={(e) => setNewWorkMinutes(Math.max(0, Number(e.target.value)))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            disabled={isRunning}
                        />
                        <span className="text-gray-600 text-lg font-semibold">:</span>
                        <input
                            type="number"
                            value={newWorkSeconds}
                            onChange={(e) => setNewWorkSeconds(Math.max(0, Number(e.target.value)))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            disabled={isRunning}
                        />
                    </div>
                </div>

                {/* 休憩時間設定 */}
                <div>
                    <label className="block text-gray-600 font-medium">休憩時間 (分:秒)</label>
                    <div className="flex space-x-2 mt-2 items-center">
                        <input
                            type="number"
                            value={newBreakMinutes}
                            onChange={(e) => setNewBreakMinutes(Math.max(0, Number(e.target.value)))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            disabled={isRunning}
                        />
                        <span className="text-gray-600 text-lg font-semibold">:</span>
                        <input
                            type="number"
                            value={newBreakSeconds}
                            onChange={(e) => setNewBreakSeconds(Math.max(0, Number(e.target.value)))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            disabled={isRunning}
                        />
                    </div>
                </div>
            </div>

            {/* 変更を適用ボタン */}
            <div className="mt-6 flex justify-between w-full gap-3">
                <button
                    onClick={applyChanges}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    disabled={isRunning}
                >
                    変更を適用
                </button>
                {isReading && (
                    <button
                        onClick={handleFinishRead}
                        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        disabled={isRunning}
                    >
                        読書を終える
                    </button>
                )}

                {isPopupVisible && (
                    <CenterPopupLayout onClose={closePopup}>
                        <FinishReadMenu readTime={readTime}/>
                    </CenterPopupLayout>
                )}
            </div>
        </div>
    );


};

export default TimerSettings;
