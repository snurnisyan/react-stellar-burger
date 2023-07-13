import {urlName} from "../../utils/constans";
import {checkResponse, getCookie} from "../../utils/utils";

export const TOKEN_UPDATE_LOADING = "TOKEN_UPDATE_LOADING";
export const TOKEN_UPDATE_SUCCESS = "TOKEN_UPDATE_SUCCESS";
export const TOKEN_UPDATE_ERROR = "TOKEN_UPDATE_ERROR";

export function postFetch() {
  return fetch(`${urlName}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
}

export function postTokenUpdate() {
  return function (dispatch) {
    dispatch({
      type: TOKEN_UPDATE_LOADING
    })
    return postFetch()
      .then(checkResponse)
      .then(resJson => {
        if (resJson.success) {
          dispatch({
            type: TOKEN_UPDATE_SUCCESS,
            accessToken: resJson.accessToken,
            refreshToken: resJson.refreshToken
          })
        } else {
          throw new Error(`Ошибка: success - false`);
        }
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: TOKEN_UPDATE_ERROR
        })
      })
  }
}

