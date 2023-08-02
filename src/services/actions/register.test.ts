import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
import {AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS} from "./auth";
import {postRegister} from "./register";
import {testUser} from "../../utils/constans";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;


describe('async POST register actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('posts successful register', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockReturnValue({
        success: true,
        accessToken: "Bearer test-token",
        refreshToken: "test refresh token",
        user: testUser,
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: AUTH_LOADING },
      {
        type: AUTH_SUCCESS,
        accessToken: "Bearer test-token",
        refreshToken: "test refresh token",
        user: testUser
      }]

    const store = mockStore({ authData: {
        error: null,
        loading: false,
        accessToken: "",
        refreshToken: "",
        user: {}
      }})

    const dispatch = store.dispatch as MockDispatch;
    return dispatch(postRegister(testUser.email, testUser.password, testUser.name)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('posts error register', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: AUTH_LOADING },
      {
        type: AUTH_ERROR,
        error: "Register error: {}"
      }]

    const store = mockStore({ authData: {
        error: null,
        loading: false,
        accessToken: "",
        refreshToken: "",
        user: {}
      }})
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(postRegister(testUser.email, testUser.password, testUser.name)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
