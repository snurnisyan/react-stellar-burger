import {useDispatch as dispatchHook} from 'react-redux';
import {ActionDispatch, AppThunk} from "../types";

export const useDispatch = () => dispatchHook<ActionDispatch | AppThunk>();
