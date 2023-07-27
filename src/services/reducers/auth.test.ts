import {authReducer} from "./auth";
import {AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS} from "../actions/auth";

describe('auth reducer', () => {
  it('should handle AUTH_LOADING', () => {
    expect(authReducer(undefined, { type: AUTH_LOADING })).toEqual(
      {
        error: null,
        loading: true,
        accessToken: "",
        refreshToken: "",
        user: {}
      }
    )
  })
  it('should handle AUTH_SUCCESS', () => {
    expect(authReducer(undefined, {
        type: AUTH_SUCCESS,
        accessToken: "test token",
        refreshToken: "test refresh token",
        user: {
          name: "Test Name",
          email: "test@test.ru",
          password: "Test1234"
        }
      })
    ).toEqual({
      error: null,
      loading: false,
      accessToken: "test token",
      refreshToken: "test refresh token",
      user: {
        name: "Test Name",
        email: "test@test.ru",
        password: "Test1234"
      }
    })
  })
  it('should handle AUTH_ERROR', () => {
    expect(authReducer(undefined, {
        type: AUTH_ERROR,
        error: "error"
      })
    ).toEqual({
      error: "error",
      loading: false,
      accessToken: "",
      refreshToken: "",
      user: {}
    })
  })
})
