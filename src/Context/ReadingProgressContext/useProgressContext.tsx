import { useContext } from "react";
import ReadingProgressContext from "./ProgressContext";

export const useReadingProgressContext = () => useContext(ReadingProgressContext);
