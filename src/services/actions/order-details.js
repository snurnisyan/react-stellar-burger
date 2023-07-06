import {urlName} from "../../utils/constans";
import {checkResponse} from "../../utils/utils";
import {CLEAR_CONSTRUCTOR} from "./burger-constructor";

export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_LOADING = 'ORDER_LOADING';
export const ORDER_FAILED = 'ORDER_FAILED';

export function postFetch(ingredientIds) {
  return fetch(`${urlName}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      ingredients: ingredientIds
    })
  })
}

export function postData(ingredientIds) {
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


