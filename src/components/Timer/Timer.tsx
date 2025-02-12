import { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import TimerSettings from "./TimerSettings";
import { useReadingBookContext } from "../../Context/ReadingBookContext/useReadingBookContext";
import { useReadingProgressContext } from "../../Context/ReadingProgressContext/useProgressContext";
import axios from "axios";

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
    const [ isReading, setIsReading] = useState<boolean>(false);
    const { readingBook } = useReadingBookContext(); //BookListからReadingBookの値を参照
    const { readingProgress } = useReadingProgressContext();

    useEffect(() => {
        setIsReading(!!readingBook);
        if (readingBook) {
            setTotalWorkTime(readingProgress?.read_time || 0);
        }
    }, [readingBook, readingProgress?.read_time]);
    
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
    
        if (isRunning && timeLeft > -1) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
                if (isWorkTime && timeLeft !== 0) {
                    setTotalWorkTime((prevTotal) => prevTotal + 1);
                }
            }, 1000);
        } else if (timeLeft === -1) {
            clearInterval(timer);
            alert(isWorkTime ? "作業時間が終了しました！休憩時間を開始します。" : "休憩時間が終了しました！作業を再開します。");
            console.log(`総作業時間: ${Math.floor(totalWorkTime / 3600)}時間 ${Math.floor(totalWorkTime / 60)}分 ${totalWorkTime % 60}秒`);
    
            // 非同期処理を別関数として定義
            const updateReadTime = async () => {
                try {
                    await axios.patch(`http://localhost:8000/books/${readingProgress?.book_id}/progress`, {
                        read_state: readingProgress?.read_state,
                        read_time: totalWorkTime,
                        current_page: readingProgress?.current_page
                    });
                } catch (error) {
                    console.error("Error updating read time", error);
                }
            };
    
            updateReadTime(); // 非同期関数を呼び出す
    
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
    }, [isRunning, timeLeft, isWorkTime, workTime, breakTime, count, readingProgress, totalWorkTime]);
    

    const toggleTimer =async () => {
        setIsRunning(!isRunning);
        if (isRunning && isWorkTime) {
            console.log(`総作業時間: ${Math.floor(totalWorkTime/ 3600)}時間 ${Math.floor(totalWorkTime / 60)}分 ${totalWorkTime % 60}秒`);
            try{
                await axios.patch(`http://localhost:8000/books/${readingProgress?.book_id}/progress`,{
                    read_state: readingProgress?.read_state,
                    read_time: totalWorkTime,
                    current_page: readingProgress?.current_page
                });
            } catch (error) {
                console.error("Error updating read time", error)
            }
        }
    };

    const resetTimer =async () => {
        setIsRunning(false);
        setTimeLeft(workTime);
        setIsWorkTime(true);
        console.log(`総作業時間: ${Math.floor(totalWorkTime/ 3600)}時間 ${Math.floor(totalWorkTime / 60)}分 ${totalWorkTime % 60}秒`);
        try{
            await axios.patch(`http://localhost:8000/books/${readingProgress?.book_id}/progress`,{
                read_state: readingProgress?.read_state,
                read_time: totalWorkTime,
                current_page: readingProgress?.current_page
            });
        } catch (error) {
            console.error("Error updating read time", error)
        }
    };

    const applyChanges = (): void => {
        const newWorkTimeInSeconds = newWorkMinutes * 60 + newWorkSeconds;
        const newBreakTimeInSeconds = newBreakMinutes * 60 + newBreakSeconds;
        setWorkTime(newWorkTimeInSeconds);
        setBreakTime(newBreakTimeInSeconds);
        setTimeLeft(isWorkTime ? newWorkTimeInSeconds : newBreakTimeInSeconds);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen animate-fadeIn">
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
            
            <div className="text-sm text-gray-600 sm:text-lg sm:mb-1">
                選択中の本: <span className="text-green-600">{readingBook?.title}</span>
            </div>
            
            <div className="text-sm text-gray-600">
                総作業時間: {Math.floor(totalWorkTime / 3600)}時間 {Math.floor((totalWorkTime % 3600) / 60)}分 {totalWorkTime % 60}秒
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
                isReading={isReading}
                readTime={totalWorkTime}
            />
        </div>
    );
};

export default Timer;


