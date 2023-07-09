import {urlName} from "../../utils/constans";
import {checkResponse, ForbiddenError, getCookie} from "../../utils/utils";
import {postTokenUpdate} from "./update-token";

export const USER_LOADING = "USER_LOADING";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

export function getUserApi() {
  console.log('getUserApi');
  const token = getCookie('token');
  return fetch(`${urlName}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type':'application/json',
      'Authorization': token? 'Bearer ' + token : '',
    }
  })
}

export function patchUserApi({ email, name, password }) {
  const token = getCookie('token');
  return fetch(`${urlName}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      'Authorization': token? 'Bearer ' + token : '',
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password
    })
  })
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: USER_LOADING
    })
    return getUserApi()
      .then(checkResponse)
      .then(resJson => {
        if (resJson.success) {
          console.log('getUser success');
          dispatch({
            type: USER_SUCCESS,
            user: resJson.user
          })
        } else {
          throw new Error(`Ошибка: success - false`);
        }
      })
      .catch(err => {
        console.error(err);
        if (err.name === 'ForbiddenError') {
          console.log('if ForbiddenError');
          dispatch(postTokenUpdate()).then(() => dispatch(getUser()));
          return;
        }
        dispatch({
          type: USER_ERROR,
          error: `User loading error: ${JSON.stringify(err)}`
        })
      })
  }
}

export function patchUser({ email, name, password }) {
  return function (dispatch) {
    dispatch({
      type: USER_LOADING
    })
    patchUserApi({ email, name, password })
      .then(checkResponse)
      .then(resJson => {
        if (resJson.success) {
          console.log(`resJson: ${JSON.stringify(resJson)}`);
          dispatch({
            type: USER_SUCCESS,
            user: resJson.user
          })
        } else {
          throw new Error(`Ошибка: success - false`);
        }
      })
      .catch(err => {
        console.error(err);
        if (err.name === 'ForbiddenError') {
          dispatch(postTokenUpdate()).then(() => patchUserApi({ email, name, password }));
          return;
        }
        dispatch({
          type: USER_ERROR,
          error: `User patching error: ${JSON.stringify(err)}`
        })
      })
  }
}

