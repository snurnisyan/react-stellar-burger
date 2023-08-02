import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
import {postTokenUpdate, TOKEN_UPDATE_ERROR, TOKEN_UPDATE_LOADING, TOKEN_UPDATE_SUCCESS} from "./update-token";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;


describe('async POST update token actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('posts successful update token', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockReturnValue({
        success: true,
        accessToken: "Bearer test-token",
        refreshToken: "test refresh token",
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: TOKEN_UPDATE_LOADING },
      {
        type: TOKEN_UPDATE_SUCCESS,
        accessToken: "Bearer test-token",
        refreshToken: "test refresh token",
      }]

    const store = mockStore({ updateToken: {
        success: false,
        loading: false,
        accessToken: "",
        refreshToken: ""
      }})

    const dispatch = store.dispatch as MockDispatch;
    return dispatch(postTokenUpdate()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('posts error update token', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: TOKEN_UPDATE_LOADING },
      { type: TOKEN_UPDATE_ERROR }]

    const store = mockStore({ updateToken: {
        success: false,
        loading: false,
        accessToken: "",
        refreshToken: ""
      }})
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(postTokenUpdate()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
