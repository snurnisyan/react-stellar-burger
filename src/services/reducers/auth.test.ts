import {authReducer, initialState} from "./auth";
import {AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS} from "../actions/auth";
import {USER_ERROR, USER_LOADING, USER_SUCCESS} from "../actions/profile";
import {LOGOUT_ERROR, LOGOUT_LOADING, LOGOUT_SUCCESS} from "../actions/logout";
import {toBeOneOf} from 'jest-extended';
import {testUser} from "../../utils/constans";

expect.extend({ toBeOneOf });

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle AUTH_LOADING', () => {
    expect(authReducer(initialState, { type: AUTH_LOADING })).toEqual(
      {
        ...initialState,
        loading: true,
      }
    )
  })
  it('should handle AUTH_SUCCESS', () => {
    const action = {
      type: AUTH_SUCCESS,
      accessToken: "Bearer test-token",
      refreshToken: "test refresh token",
      user: testUser
    }

    expect(authReducer(initialState, action)
    ).toEqual({
      ...initialState,
      accessToken: "test-token",
      refreshToken: "test refresh token",
      user: testUser
    })
  })
  it('should handle AUTH_ERROR', () => {
    const action = {
      type: AUTH_ERROR,
      error: "error"
    }
    expect(authReducer(initialState, action)
    ).toEqual({
      ...initialState,
      error: "error",
    })
  })

  it('should handle USER_LOADING', () => {
    expect(authReducer(initialState, { type: USER_LOADING })).toEqual(
      {
        ...initialState,
        loading: true,
      }
    )
  })
  it('should handle USER_SUCCESS', () => {
    const action = {
      type: USER_SUCCESS,
      user: testUser
    }
    expect(authReducer(initialState, action))
      .toMatchObject({
        ...initialState,
        accessToken: expect.toBeOneOf([expect.anything(), undefined]),
        refreshToken: expect.toBeOneOf([expect.anything(), undefined]),
        user: testUser
    })
  })
  it('should handle USER_ERROR', () => {
    const action = {
      type: USER_ERROR,
      error: "error"
    }
    expect(authReducer(initialState, action)
    ).toEqual({
      ...initialState,
      error: "error",
    })
  })

  it('should handle LOGOUT_LOADING', () => {
    expect(authReducer(initialState, { type: LOGOUT_LOADING })).toEqual(
      {
        ...initialState,
        loading: true,
      }
    )
  })
  it('should handle LOGOUT_SUCCESS', () => {
    expect(authReducer(initialState, { type: LOGOUT_SUCCESS })
    ).toEqual({
      ...initialState,
      error: null,
      loading: false,
    })
  })
  it('should handle LOGOUT_ERROR', () => {
    const action = {
      type: LOGOUT_ERROR,
      error: "error"
    }
    expect(authReducer(initialState, action)
    ).toEqual({
      ...initialState,
      error: "error",
    })
  })
})
