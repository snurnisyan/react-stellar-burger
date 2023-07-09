import {urlName} from "../../utils/constans";
import {checkResponse} from "../../utils/utils";
import {AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS} from "./auth";

export function postFetch(email, password, name) {
  return fetch(`${urlName}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  })
}

export function postRegister(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: AUTH_LOADING
    })
    postFetch(email, password, name)
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
          error: `Register error: ${JSON.stringify(err)}`
        })
      })
  }
}

