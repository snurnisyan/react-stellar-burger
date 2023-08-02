import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
import {EMAIL_ERROR, EMAIL_LOADING, EMAIL_SUCCESS, postEmailCheck} from "./forgot-password";
import {testUser} from "../../utils/constans";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;

describe('async POST forgot password actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('posts successful forgot password', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockReturnValue({
        success: true
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: EMAIL_LOADING },
      { type: EMAIL_SUCCESS }
    ]

    const store = mockStore({ forgotPassword: {
        success: true,
        loading: false
      }})

    const dispatch = store.dispatch as MockDispatch;

    return dispatch(postEmailCheck(testUser.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  it('posts error forgot password', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: EMAIL_LOADING },
      { type: EMAIL_ERROR }
    ]

    const store = mockStore({ forgotPassword: {
        error: null,
        loading: false
      }})
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(postEmailCheck(testUser.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
