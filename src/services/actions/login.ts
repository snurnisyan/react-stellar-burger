import {urlName} from "../../utils/constans";
import {checkResponse, getCookie} from "../../utils/utils";
import {AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS} from "./auth";
import {AppThunk} from "../types";


export function postFetch(email: string, password: string) {
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

export const postLogin: AppThunk = (email: string, password: string) => {
  return function (dispatch) {
    dispatch({
      type: AUTH_LOADING
    })
    return postFetch(email, password)
      .then(checkResponse)
      .then(resJson => {
        if (resJson.success) {
          dispatch({
            type: AUTH_SUCCESS,
            accessToken: resJson.accessToken,
            refreshToken: resJson.refreshToken,
            user: resJson.user
          })
          return resJson;
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
        return err;
      })
  }
}

