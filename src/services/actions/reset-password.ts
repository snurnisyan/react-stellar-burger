import {urlName} from "../../utils/constans";
import {checkResponse} from "../../utils/utils";
import {EMAIL_SUCCESS} from "./forgot-password";
import {AppThunk} from "../types";

export const RESET_LOADING: "RESET_LOADING" = "RESET_LOADING";
export const RESET_SUCCESS: "RESET_SUCCESS" = "RESET_SUCCESS";
export const RESET_ERROR: "RESET_ERROR" = "RESET_ERROR";

interface IResetLoadingAction {
  readonly type: typeof RESET_LOADING;
}

interface IResetSuccessAction {
  readonly type: typeof RESET_SUCCESS;
}

interface IResetErrorAction {
  readonly type: typeof RESET_ERROR;
}

export type TResetPasswordActions = IResetLoadingAction | IResetSuccessAction | IResetErrorAction;

export function postFetch(newPassword: string, token: string) {
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

export const postPasswordReset: AppThunk = (newPassword: string, token: string) => {
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

