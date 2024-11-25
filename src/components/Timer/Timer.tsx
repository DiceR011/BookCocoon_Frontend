import { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import TimerSettings from "./TimerSettings";

const Timer: React.FC = () => {
    const [workTime, setWorkTime] = useState<number>(25 * 60);
    const [breakTime, setBreakTime] = useState<number>(5 * 60);
    const [newWorkMinutes, setNewWorkMinutes] = useState<number>(25);
    const [newWorkSeconds, setNewWorkSeconds] = useState<number>(0);
    const [newBreakMinutes, setNewBreakMinutes] = useState<number>(5);
    const [newBreakSeconds, setNewBreakSeconds] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(workTime);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isWorkTime, setIsWorkTime] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [totalWorkTime, setTotalWorkTime] = useState<number>(0); // 総作業時間を記録

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (isRunning && timeLeft > -1) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
                if (isWorkTime && timeLeft != 0) {
                    setTotalWorkTime((prevTotal) => prevTotal + 1); // 作業時間を加算
                }
            }, 1000);
        } else if (timeLeft === -1) {
            clearInterval(timer);
            alert(isWorkTime ? "作業時間が終了しました！休憩時間を開始します。" : "休憩時間が終了しました！作業を再開します。");

            if (isWorkTime) {
                setTimeLeft(breakTime);
                setCount(count + 1);
            } else {
                setTimeLeft(workTime);
            }
            setIsWorkTime(!isWorkTime);
            setIsRunning(false);
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft, isWorkTime, workTime, breakTime, count]);

    const toggleTimer = (): void => {
        setIsRunning(!isRunning);
        if (!isRunning) {
            console.log(`総作業時間: ${Math.floor(totalWorkTime / 60)}分 ${totalWorkTime % 60}秒`);
        }
    };

    const resetTimer = (): void => {
        setIsRunning(false);
        setTimeLeft(workTime);
        setIsWorkTime(true);
        console.log(`総作業時間: ${Math.floor(totalWorkTime / 60)}分 ${totalWorkTime % 60}秒`);
    };

    const applyChanges = (): void => {
        const newWorkTimeInSeconds = newWorkMinutes * 60 + newWorkSeconds;
        const newBreakTimeInSeconds = newBreakMinutes * 60 + newBreakSeconds;
        setWorkTime(newWorkTimeInSeconds);
        setBreakTime(newBreakTimeInSeconds);
        setTimeLeft(isWorkTime ? newWorkTimeInSeconds : newBreakTimeInSeconds);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <TimerDisplay
                timeLeft={timeLeft}
                totalTime={isWorkTime ? workTime : breakTime}
                isWorkTime={isWorkTime}
            />
            <div className="mt-4 text-lg font-semibold text-gray-700">
                {isRunning ? (
                    <>現在 <span className={isWorkTime ? "text-blue-500" : "text-orange-500"}>{isWorkTime ? "作業中" : "休憩中"}</span> - 完了済み: {count}回</>
                ) : (
                    <>
                        {timeLeft === (isWorkTime ? workTime : breakTime) ? (
                            <>
                                開始準備中 -
                                <span className={isWorkTime ? "text-blue-500" : "text-orange-500"}>
                                    {isWorkTime ? "作業を開始しましょう" : "休憩を開始しましょう"}
                                </span>
                            </>
                        ) : (
                            <>
                                一時停止中 -
                                <span className={isWorkTime ? "text-blue-500" : "text-orange-500"}>
                                    {isWorkTime ? "作業を再開しましょう" : "休憩を再開しましょう"}
                                </span>
                            </>
                        )}
                    </>

                )}
            </div>
            <div className="text-sm text-gray-600">
                総作業時間: {Math.floor(totalWorkTime / 60)}分 {totalWorkTime % 60}秒
            </div>
            <TimerControls
                isRunning={isRunning}
                toggleTimer={toggleTimer}
                resetTimer={resetTimer}
            />
            <TimerSettings
                newWorkMinutes={newWorkMinutes}
                newWorkSeconds={newWorkSeconds}
                setNewWorkMinutes={setNewWorkMinutes}
                setNewWorkSeconds={setNewWorkSeconds}
                newBreakMinutes={newBreakMinutes}
                newBreakSeconds={newBreakSeconds}
                setNewBreakMinutes={setNewBreakMinutes}
                setNewBreakSeconds={setNewBreakSeconds}
                applyChanges={applyChanges}
                isRunning={isRunning}
            />
        </div>
    );
};

export default Timer;


