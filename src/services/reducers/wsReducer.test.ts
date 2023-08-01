import {initialState, wsReducer} from "./wsReducer";
import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_AUTH_ORDERS,
  WS_GET_ORDERS
} from "../actions/wsActions";

describe('websocket reducer', () => {
  it('should return initial state', () => {
    expect(wsReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle WS_CONNECTION_START', () => {
    const action = {
      type: WS_CONNECTION_START,
      payload: ''
    }
    expect(wsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        wsConnected: false,
        wsError: undefined
      }
    )
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: WS_CONNECTION_SUCCESS,
      payload: ''
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: true,
      wsError: undefined
    })
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    const action = {
      type: WS_CONNECTION_ERROR,
      payload: 'error event' as any
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: false,
      wsError: 'error event'
    })
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    const action = {
      type: WS_CONNECTION_CLOSED,
      payload: ''
    }
    expect(wsReducer(initialState, action)).toEqual({ ...initialState })
  })

  it('should handle WS_GET_ORDERS', () => {
    const action = {
      type: WS_GET_ORDERS,
      payload: {
        orders: [{test: 1}] as any,
        total: 100,
        totalToday: 1
      }
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: true,
      wsError: undefined,
      orders: [{test: 1}],
      total: 100,
      totalToday: 1,
    })
  })

  it('should handle WS_AUTH_CONNECTION_START', () => {
    const action = {
      type: WS_AUTH_CONNECTION_START,
      payload: ''
    }
    expect(wsReducer(initialState, action)).toEqual(
      {
        ...initialState,
        wsAuthConnected: false,
        wsAuthError: undefined
      }
    )
  })

  it('should handle WS_AUTH_CONNECTION_SUCCESS', () => {
    const action = {
      type: WS_AUTH_CONNECTION_SUCCESS,
      payload: ''
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsAuthConnected: true,
      wsAuthError: undefined
    })
  })

  it('should handle WS_AUTH_CONNECTION_ERROR', () => {
    const action = {
      type: WS_AUTH_CONNECTION_ERROR,
      payload: 'auth error event' as any
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsAuthConnected: false,
      wsAuthError: 'auth error event'
    })
  })

  it('should handle WS_AUTH_CONNECTION_CLOSED', () => {
    const action = {
      type: WS_AUTH_CONNECTION_CLOSED,
      payload: ''
    }
    expect(wsReducer(initialState, action)).toEqual({ ...initialState })
  })

  it('should handle WS_GET_AUTH_ORDERS', () => {
    const action = {
      type: WS_GET_AUTH_ORDERS,
      payload: {
        orders: [{test: 2}] as any,
        total: 200,
        totalToday: 2
      }
    }
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsAuthConnected: true,
      wsAuthError: undefined,
      userOrders: [{test: 2}],
      total: 200,
      totalToday: 2,
    })
  })
})
