interface TimerControlsProps {
    isRunning: boolean;
    toggleTimer: () => void;
    resetTimer: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({ isRunning, toggleTimer, resetTimer }) => {
    return (
        <div className="mt-6 flex space-x-4">
            <button
                onClick={toggleTimer}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                {isRunning ? "一時停止" : "開始"}
            </button>
            <button
                onClick={resetTimer}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
                リセット
            </button>
        </div>
    );
};

export default TimerControls;
