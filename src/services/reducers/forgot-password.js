import {EMAIL_ERROR, EMAIL_LOADING, EMAIL_SUCCESS} from "../actions/forgot-password";


const initialState = {
  success: false,
  loading: false
}

export const forgotPasswordReducer = (state = initialState, action) => {
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
