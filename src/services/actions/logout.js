import {urlName} from "../../utils/constans";
import {checkResponse, getCookie} from "../../utils/utils";

export const LOGOUT_LOADING = "LOGOUT_LOADING";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export function postFetch() {
  return fetch(`${urlName}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
}

export function postLogout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_LOADING
    })
    return postFetch()
      .then(checkResponse)
      .then(resJson => {
        if (resJson.success) {
          dispatch({
            type: LOGOUT_SUCCESS
          })
        } else {
          throw new Error(`Ошибка: success - false`);
        }
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: LOGOUT_ERROR,
          error: `Logout error: ${JSON.stringify(err)}`
        })
      })
  }
}

