import {initialState, updateTokenReducer} from "./update-token";
import {TOKEN_UPDATE_ERROR, TOKEN_UPDATE_LOADING, TOKEN_UPDATE_SUCCESS} from "../actions/update-token";

describe('update token reducer', () => {
  it('should return initial state', () => {
    expect(updateTokenReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle TOKEN_UPDATE_LOADING', () => {
    expect(updateTokenReducer(initialState, { type: TOKEN_UPDATE_LOADING })).toEqual(
      {
        ...initialState,
        success: false,
        loading: true
      }
    )
  })
  it('should handle TOKEN_UPDATE_SUCCESS', () => {
    const action = {
      type: TOKEN_UPDATE_SUCCESS,
      accessToken: "test token",
      refreshToken: "test refresh token"
    }
    expect(updateTokenReducer(initialState, action)).toEqual({
      success: true,
      loading: false,
      accessToken: "test token",
      refreshToken: "test refresh token"
    })
  })
  it('should handle TOKEN_UPDATE_ERROR', () => {
    expect(updateTokenReducer(initialState, { type: TOKEN_UPDATE_ERROR })
    ).toEqual({
      ...initialState,
      success: false
    })
  })
})
