import {urlName} from "../../utils/constans";
import {checkResponse} from "../../utils/utils";
import {EMAIL_SUCCESS} from "./forgot-password";

export const RESET_LOADING = "RESET_LOADING";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_ERROR = "RESET_ERROR";

export function postFetch(newPassword, token) {
  return fetch(`${urlName}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      password: newPassword,
      token: token
    })
  })
}

export function postPasswordReset(newPassword, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_LOADING
    })
    postFetch(newPassword, token)
      .then(checkResponse)
      .then(resJson => {
        if (resJson.success) {
          dispatch({
            type: EMAIL_SUCCESS
          })
        } else {
          throw new Error(`Ошибка: ${resJson.message}`);
        }
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: RESET_ERROR
        })
      })
  }
}

