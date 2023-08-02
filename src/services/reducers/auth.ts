import {AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS, TAuthActions} from "../actions/auth";
import {deleteCookie, getCookie, setTokens} from "../../utils/utils";
import {USER_ERROR, USER_LOADING, USER_SUCCESS} from "../actions/profile";
import {LOGOUT_ERROR, LOGOUT_LOADING, LOGOUT_SUCCESS} from "../actions/logout";
import {IUser} from "../types";

export type TAuthState = {
  error: boolean | null | string;
  loading: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: IUser;
}

export const initialState: TAuthState = {
  error: null,
  loading: false,
  accessToken: "",
  refreshToken: "",
  user: {} as IUser
}

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      setTokens(action.accessToken, action.refreshToken);
      return {
        ...state,
        error: null,
        loading: false,
        accessToken: getCookie("token"),
        refreshToken: getCookie("refreshToken"),
        user: action.user
      }
    }
    case AUTH_LOADING: {
      return {
        ...state,
        error: null,
        loading: true,
      }
    }
    case AUTH_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    }
    case USER_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        accessToken: getCookie('token'),
        refreshToken: getCookie('refreshToken'),
        user: action.user
      }
    }
    case USER_LOADING: {
      return {
        ...state,
        error: null,
        loading: true
      }
    }
    case USER_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }
    case LOGOUT_SUCCESS: {
      deleteCookie('refreshToken');
      deleteCookie('token');
      return {
        ...state,
        error: null,
        loading: false,
        accessToken: "",
        refreshToken: "",
        user: {} as IUser
      }
    }
    case LOGOUT_LOADING: {
      return {
        ...state,
        error: null,
        loading: true,
      }
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    }
    default: {
      return state;
    }
  }
}
