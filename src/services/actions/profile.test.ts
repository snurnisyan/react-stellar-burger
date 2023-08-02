import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
import {getUser, patchUser, USER_ERROR, USER_LOADING, USER_SUCCESS} from "./profile";
import {testUser} from "../../utils/constans";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;

describe('async GET profile actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets successful profile', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockReturnValue({
        success: true,
        user: testUser,
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: USER_LOADING },
      {
        type: USER_SUCCESS,
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
    return dispatch(getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('gets error profile', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: USER_LOADING },
      {
        type: USER_ERROR,
        error: "User loading error: {}"
      }]

    const store = mockStore({ authData: {
        error: null,
        loading: false,
        accessToken: "",
        refreshToken: "",
        user: {}
      }})
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('async PATCH profile actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('patches successful profile', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockReturnValue({
        success: true,
        user: testUser,
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: USER_LOADING },
      {
        type: USER_SUCCESS,
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
    return dispatch(patchUser({ email: testUser.email, name: testUser.name, password: testUser.password })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('patches error profile', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: USER_LOADING },
      {
        type: USER_ERROR,
        error: "User patching error: {}"
      }]

    const store = mockStore({ authData: {
        error: null,
        loading: false,
        accessToken: "",
        refreshToken: "",
        user: {}
      }})
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(patchUser({ email: testUser.email, name: testUser.name, password: testUser.password })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
