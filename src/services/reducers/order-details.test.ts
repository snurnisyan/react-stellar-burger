import {IOrder} from "../types";
import {orderDetailsReducer, TOrderDetailsState} from "./order-details";
import {ORDER_FAILED, ORDER_LOADING, ORDER_SUCCESS} from "../actions/order-details";

describe('order details reducer', () => {
  const initialState: TOrderDetailsState = {
  order: {} as IOrder,
  loading: false,
  error: false
}
  it('should return initial state', () => {
    expect(orderDetailsReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle ORDER_LOADING', () => {
    expect(orderDetailsReducer(initialState, { type: ORDER_LOADING })).toEqual(
      {
        ...initialState,
        loading: true
      }
    )
  })
  it('should handle ORDER_SUCCESS', () => {
    const action = {
      type: ORDER_SUCCESS,
      payload: {test: 1} as any
    }
    expect(orderDetailsReducer(initialState, action)).toEqual({
      order: {test: 1},
      loading: false,
      error: false
    })
  })
  it('should handle ORDER_FAILED', () => {
    expect(orderDetailsReducer(initialState, { type: ORDER_FAILED })
    ).toEqual({
      ...initialState,
      error: true
    })
  })
})
