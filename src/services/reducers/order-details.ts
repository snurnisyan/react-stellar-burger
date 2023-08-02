import {ORDER_FAILED, ORDER_LOADING, ORDER_SUCCESS, TOrderDetailsActions} from "../actions/order-details";
import {IOrder} from "../types";

export type TOrderDetailsState = {

  order: IOrder;
  loading: boolean;
  error: boolean | null;
}

export const initialState: TOrderDetailsState = {
  order: {} as IOrder,
  loading: false,
  error: false
}

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions) => {
  switch (action.type) {
    case ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: false
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
