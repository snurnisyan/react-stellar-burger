import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
import {DATA_FAILED, DATA_LOADING, DATA_SUCCESS, getData} from "./burger-ingredients";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;

describe('async GET ingredients actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets successful ingredients', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: true,
        data: [{test: 1}, {test: 2}]
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: DATA_LOADING },
      {
        type: DATA_SUCCESS,
        ingredients: [{test: 1}, {test: 2}]
      }]

    const store = mockStore({ ingredientsData: {
        error: null,
        loading: false,
        accessToken: "",
        refreshToken: "",
        user: {}
      }})
    const dispatch = store.dispatch as MockDispatch;
    return dispatch(getData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('gets error ingredients', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: DATA_LOADING },
      { type: DATA_FAILED } ]

    const store = mockStore({ ingredientsData: {
        ingredients: [],
        loading: false,
        error: false
      }})
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(getData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
