import {EMAIL_ERROR, EMAIL_LOADING, EMAIL_SUCCESS, TForgotPasswordActions} from "../actions/forgot-password";

export type TForgotPasswordState = {
  success: boolean | null;
  loading: boolean;
}

export const initialState: TForgotPasswordState = {
  success: false,
  loading: false
}

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions) => {
  switch (action.type) {
    case EMAIL_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false
      }
    }
    case EMAIL_LOADING: {
      return {
        ...state,
        success: false,
        loading: true,
      }
    }
    case EMAIL_ERROR: {
      return {
        ...state,
        success: false,
        loading: false
      }
    }
    default: {
      return state;
    }
  }
}
