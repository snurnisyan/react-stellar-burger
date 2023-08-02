import {RESET_ERROR, RESET_LOADING, RESET_SUCCESS, TResetPasswordActions} from "../actions/reset-password";

export type TResetPasswordState = {
  success: boolean | null;
  loading: boolean;
}

export const initialState: TResetPasswordState = {
  success: false,
  loading: false
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions) => {
  switch (action.type) {
    case RESET_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false
      }
    }
    case RESET_LOADING: {
      return {
        ...state,
        success: false,
        loading: true
      }
    }
    case RESET_ERROR: {
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
