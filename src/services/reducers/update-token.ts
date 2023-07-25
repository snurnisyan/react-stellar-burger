import {
  TOKEN_UPDATE_ERROR,
  TOKEN_UPDATE_LOADING,
  TOKEN_UPDATE_SUCCESS,
  TTokenUpdateActions
} from "../actions/update-token";
import {setTokens} from "../../utils/utils";

type TUpdateTokenState = {
  success: boolean | null;
  loading: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: TUpdateTokenState = {
  success: false,
  loading: false,
  accessToken: "",
  refreshToken: ""
}

export const updateTokenReducer = (state = initialState, action: TTokenUpdateActions) => {
  switch (action.type) {
    case TOKEN_UPDATE_SUCCESS: {
      setTokens(action.accessToken, action.refreshToken);
      return {
        ...state,
        success: true,
        loading: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      }
    }
    case TOKEN_UPDATE_LOADING: {
      return {
        ...state,
        success: false,
        loading: true,
      }
    }
    case TOKEN_UPDATE_ERROR: {
      return {
        ...state,
        success: false,
        loading: false,
      }
    }
    default: {
      return state;
    }
  }
}
