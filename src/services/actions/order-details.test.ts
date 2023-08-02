import configureMockStore from 'redux-mock-store';
import thunk, {ThunkAction} from 'redux-thunk';
import {ORDER_FAILED, ORDER_LOADING, ORDER_SUCCESS, postData} from "./order-details";
import {CLEAR_CONSTRUCTOR} from "./burger-constructor";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
type MockDispatch = (action: ThunkAction<any, any, any, any>) => Promise<any>;

describe('async POST order details actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('posts successful order details', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: true,
        order: {test: 1}
      }),
      ok: true,
    } as any)

    const expectedActions = [
      { type: ORDER_LOADING },
      {
        type: ORDER_SUCCESS,
        payload: {test: 1}
      },
      { type: CLEAR_CONSTRUCTOR }
    ]

    const store = mockStore({ orderDetails: { order: {}} })
    const dispatch = store.dispatch as MockDispatch;
    return dispatch(postData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('gets error ingredients', () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as any)

    const expectedActions = [
      { type: ORDER_LOADING },
      { type: ORDER_FAILED } ]

    const store = mockStore({ orderDetails: {order: {}} })
    const dispatch = store.dispatch as MockDispatch;

    return dispatch(postData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
