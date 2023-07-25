import {useDispatch as dispatchHook} from 'react-redux';
import {ActionDispatch, AppThunkDispatch} from "../types";

export const useDispatch = () => dispatchHook<ActionDispatch | AppThunkDispatch>();
