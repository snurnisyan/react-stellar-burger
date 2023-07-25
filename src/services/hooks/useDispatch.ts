import {useDispatch as dispatchHook} from 'react-redux';
import {AppDispatch, AppThunk} from "../types";

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
