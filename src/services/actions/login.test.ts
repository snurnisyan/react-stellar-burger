import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {urlName} from "../../utils/constans";
import {AUTH_LOADING, AUTH_SUCCESS} from "./auth";
import {postLogin} from "./login";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;

describe('async auth actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates successful login', () => {
    fetchMock.postOnce(`${urlName}/auth/login`, {
      body: {
        accessToken: "test token",
        refreshToken: "test refresh token",
        user: {
          name: "Test Name",
          email: "test@test.ru",
          password: "Test1234"
        }
      },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: AUTH_LOADING },
      {
        type: AUTH_SUCCESS,
        accessToken: "test token",
        refreshToken: "test refresh token",
        user: {
          name: "Test Name",
          email: "test@test.ru",
          password: "Test1234"
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
})
