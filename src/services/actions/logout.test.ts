import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
import {LOGOUT_ERROR, LOGOUT_LOADING, LOGOUT_SUCCESS, postLogout} from "./logout";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;

describe('async POST logout actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('posts successful logout', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockReturnValue({
        success: true,
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: LOGOUT_LOADING },
      { type: LOGOUT_SUCCESS }
    ]

    const store = mockStore({ authData: {
        error: null,
        loading: false,
        accessToken: "",
        refreshToken: "",
        user: {}
      }})

    const dispatch = store.dispatch as MockDispatch;
    return dispatch(postLogout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('posts error logout', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: LOGOUT_LOADING },
      {
        type: LOGOUT_ERROR,
        error: "Logout error: {}"
      }]

    const store = mockStore({ authData: {
        error: null,
        loading: false,
        accessToken: "",
        refreshToken: "",
        user: {}
      }})
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(postLogout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
