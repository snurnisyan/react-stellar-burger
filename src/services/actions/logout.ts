import {urlName} from "../../utils/constans";
import {checkResponse, getCookie} from "../../utils/utils";
import {AppThunk} from "../types";

export const LOGOUT_LOADING: "LOGOUT_LOADING" = "LOGOUT_LOADING";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR: "LOGOUT_ERROR" = "LOGOUT_ERROR";

interface ILogoutLoadingAction {
  readonly type: typeof LOGOUT_LOADING;
}

interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

interface ILogoutErrorAction {
  readonly type: typeof LOGOUT_ERROR;

  readonly error: boolean | string | null;
}

export type TLogoutActions = ILogoutLoadingAction | ILogoutSuccessAction | ILogoutErrorAction;

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

export const postLogout: AppThunk = () => {
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

