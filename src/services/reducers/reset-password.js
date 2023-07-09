import {RESET_ERROR, RESET_LOADING, RESET_SUCCESS} from "../actions/reset-password";


const initialState = {
  success: false,
  loading: false
}

export const resetPasswordReducer = (state = initialState, action) => {
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
