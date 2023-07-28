import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
import {postPasswordReset, RESET_ERROR, RESET_LOADING, RESET_SUCCESS} from "./reset-password";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;

describe('async POST reset password actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('posts successful reset password', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockReturnValue({
        success: true,
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: RESET_LOADING },
      { type: RESET_SUCCESS }
    ]

    const store = mockStore({ resetPassword: {
        success: false,
        loading: false
      }})

    const dispatch = store.dispatch as MockDispatch;
    return dispatch(postPasswordReset("NewPassword1234", "New test-token")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('posts error reset password', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: RESET_LOADING },
      { type: RESET_ERROR }
    ]

    const store = mockStore({ resetPassword: {
        success: false,
        loading: false
      }})
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(postPasswordReset("NewPassword1234", "New test-token")).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
