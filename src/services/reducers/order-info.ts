import {IWSOrder} from "../types";
import {REMOVE_ORDER, SET_ORDER, TOrderInfoActions} from "../actions/order-info";

type TOrdersState = {
  orderInfoLoading: boolean;
  orderInfoError: boolean;
  orderInfo: IWSOrder;
}

const initialState: TOrdersState = {
  orderInfoLoading: false,
  orderInfoError: false,
  orderInfo: {} as IWSOrder
}

export const orderInfoReducer = (state = initialState, action: TOrderInfoActions): TOrdersState => {
  switch (action.type) {
    case SET_ORDER: {
      return {
        ...state,
        orderInfo: action.order
      }
    }
    case REMOVE_ORDER: {
      return {
        ...state,
        orderInfo: {} as IWSOrder
      }
    }
    default: {
      return state;
    }
  }
}
