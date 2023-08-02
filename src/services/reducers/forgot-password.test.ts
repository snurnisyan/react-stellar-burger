import {forgotPasswordReducer, initialState} from "./forgot-password";
import {EMAIL_ERROR, EMAIL_LOADING, EMAIL_SUCCESS} from "../actions/forgot-password";

describe('forgot password reducer', () => {
  it('should return initial state', () => {
    expect(forgotPasswordReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle EMAIL_LOADING', () => {
    expect(forgotPasswordReducer(initialState, { type: EMAIL_LOADING })).toEqual(
      {
        ...initialState,
        loading: true
      }
    )
  })
  it('should handle EMAIL_SUCCESS', () => {
    expect(forgotPasswordReducer(initialState, { type: EMAIL_SUCCESS })).toEqual({
      loading: false,
      success: true
    })
  })
  it('should handle EMAIL_ERROR', () => {
    expect(forgotPasswordReducer(initialState, { type: EMAIL_ERROR })
    ).toEqual({
      ...initialState,
      success: false
    })
  })
})
