import {resetPasswordReducer, TResetPasswordState} from "./reset-password";
import {RESET_ERROR, RESET_LOADING, RESET_SUCCESS} from "../actions/reset-password";

describe('reset password reducer', () => {
  const initialState: TResetPasswordState = {
    success: false,
    loading: false
  }
  it('should return initial state', () => {
    expect(resetPasswordReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle RESET_LOADING', () => {
    expect(resetPasswordReducer(initialState, { type: RESET_LOADING })).toEqual(
      {
        ...initialState,
        loading: true
      }
    )
  })
  it('should handle RESET_SUCCESS', () => {
    expect(resetPasswordReducer(initialState, { type: RESET_SUCCESS })).toEqual({
      loading: false,
      success: true
    })
  })
  it('should handle RESET_ERROR', () => {
    expect(resetPasswordReducer(initialState, { type: RESET_ERROR })
    ).toEqual({
      ...initialState,
      success: false
    })
  })
})
