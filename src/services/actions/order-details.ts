import {urlName} from "../../utils/constans";
import {checkResponse, getCookie} from "../../utils/utils";
import {CLEAR_CONSTRUCTOR} from "./burger-constructor";
import {AppThunk, IOrder} from "../types";

export const ORDER_SUCCESS: 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_LOADING: 'ORDER_LOADING' = 'ORDER_LOADING';
export const ORDER_FAILED: 'ORDER_FAILED' = 'ORDER_FAILED';

interface IOrderLoadingAction {
  readonly type: typeof ORDER_LOADING;
}

interface IOrderSuccessAction {
  readonly type: typeof ORDER_SUCCESS;
  readonly payload: IOrder;
}

interface IOrderFailedAction {
  readonly type: typeof ORDER_FAILED;
}

export type TOrderDetailsActions = IOrderLoadingAction | IOrderSuccessAction | IOrderFailedAction;

export function postFetch(ingredientIds: string[]) {
  const token = getCookie('token');
  return fetch(`${urlName}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization': token? 'Bearer ' + token : '',
    },
    body: JSON.stringify({
      ingredients: ingredientIds
    })
  })
}

export const postData: AppThunk = (ingredientIds: string[]) => {
  return function (dispatch) {
    dispatch({
      type: ORDER_LOADING
    })
    postFetch(ingredientIds)
      .then(checkResponse)
      .then(resJson => {
        dispatch({
          type: ORDER_SUCCESS,
          payload: resJson.order
        })
        dispatch({
          type: CLEAR_CONSTRUCTOR
        })
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: ORDER_FAILED
        })
      })
  }
}


