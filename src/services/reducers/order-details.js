import {ORDER_FAILED, ORDER_LOADING, ORDER_SUCCESS} from "../actions/order-details";


const initialState = {
  order: {},
  loading: false,
  error: false
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
      }
    }
    case ORDER_LOADING: {
      return {
        ...state,
        loading: true,
        error: false
      }
    }
    case ORDER_FAILED: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
    default: {
      return state;
    }
  }
}
