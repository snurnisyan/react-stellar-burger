import {urlName} from "../../utils/constans";
import {checkResponse} from "../../utils/utils";

export const EMAIL_LOADING = "EMAIL_LOADING";
export const EMAIL_SUCCESS = "EMAIL_SUCCESS";
export const EMAIL_ERROR = "EMAIL_ERROR";

export function postFetch(email) {
  return fetch(`${urlName}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      email: email
    })
  })
}

export function postEmailCheck(email) {
  return function (dispatch) {
    dispatch({
      type: EMAIL_LOADING
    })
    postFetch(email)
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
          type: EMAIL_ERROR
        })
      })
  }
}

