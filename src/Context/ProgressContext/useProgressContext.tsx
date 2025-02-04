import { useContext } from "react";
import ProgressContext from "./ProgressContext";

export const useProgressContext = () => useContext(ProgressContext);
