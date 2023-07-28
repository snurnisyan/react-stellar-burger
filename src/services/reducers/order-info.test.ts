import {IWSOrder} from "../types";
import {orderInfoReducer, TOrdersState} from "./order-info";
import {REMOVE_ORDER, SET_ORDER} from "../actions/order-info";

describe('order info reducer', () => {
  const initialState: TOrdersState = {
    orderInfo: {} as IWSOrder
  }

  it('should return initial state', () => {
    expect(orderInfoReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle SET_ORDER', () => {
    const action = {
      type: SET_ORDER,
      order: { test: 1 } as any
    }
    expect(orderInfoReducer(initialState, action)).toEqual({ orderInfo: { test: 1 } })
  })

  it('should handle REMOVE_INGREDIENT', () => {
    expect(orderInfoReducer(initialState, { type: REMOVE_ORDER })).toEqual({ ...initialState })
  })
})
