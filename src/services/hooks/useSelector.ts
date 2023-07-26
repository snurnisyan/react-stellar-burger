import {TypedUseSelectorHook, useSelector as selectorHook} from "react-redux";
import {RootState} from "../types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
