import {urlName} from "../../utils/constans";
import {checkResponse, getCookie} from "../../utils/utils";
import {AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS} from "./auth";


export function postFetch(email, password) {
  return fetch(`${urlName}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
}

export function postLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: AUTH_LOADING
    })
    postFetch(email, password)
      .then(checkResponse)
      .then(resJson => {
        if (resJson.success) {
          dispatch({
            type: AUTH_SUCCESS,
            accessToken: resJson.accessToken,
            refreshToken: resJson.refreshToken,
            user: resJson.user
          })
        } else {
          throw new Error(`Ошибка: success - false`);
        }
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: AUTH_ERROR,
          error: `Login error: ${JSON.stringify(err)}`
        })
      })
  }
}

