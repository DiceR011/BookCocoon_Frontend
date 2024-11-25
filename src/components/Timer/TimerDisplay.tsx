import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface TimerDisplayProps {
    timeLeft: number;
    totalTime: number;
    isWorkTime: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, totalTime, isWorkTime }) => {
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <div className="w-40 sm:w-60 ">
            <CircularProgressbar
                value={(timeLeft / totalTime) * 100}
                text={formatTime(timeLeft)}
                styles={buildStyles({
                    textColor: "#000",
                    pathColor: isWorkTime ? "#3e98c7" : "#ffa500",
                    trailColor: "#d6d6d6",
                    rotation: 0.5,
                })}
            />
        </div>
    );
};

export default TimerDisplay;
