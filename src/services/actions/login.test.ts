import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
// import fetchMock from 'fetch-mock';
import {AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS} from "./auth";
import {postLogin} from "./login";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;

// fetchMock.postOnce(`${urlName}/auth/login`, {
//   body: {
//     accessToken: "test token",
//     refreshToken: "test refresh token",
//     user: {
//       name: "Test Name",
//       email: "test@test.ru",
//       password: "Test1234"
//     }
//   },
//   headers: { 'content-type': 'application/json' }
// })

describe('async POST login actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('posts successful login', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockReturnValue({
        success: true,
        accessToken: "Bearer test-token",
        refreshToken: "test refresh token",
        user: {
          name: "Test Name",
          email: "test@test.ru"
        },
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: AUTH_LOADING },
      {
        type: AUTH_SUCCESS,
        accessToken: "Bearer test-token",
        refreshToken: "test refresh token",
        user: {
          name: "Test Name",
          email: "test@test.ru"
        }
      }]

    const store = mockStore({ authData: {
      error: null,
      loading: false,
      accessToken: "",
      refreshToken: "",
      user: {}
    }})

    const dispatch = store.dispatch as MockDispatch;
    return dispatch(postLogin("Test Name", "Test1234")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('posts error login', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: AUTH_LOADING },
      {
        type: AUTH_ERROR,
        error: "Login error: {}"
      }]

    const store = mockStore({ authData: {
        error: null,
        loading: false,
        accessToken: "",
        refreshToken: "",
        user: {}
      }})
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(postLogin("Test Name", "Test1234")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
