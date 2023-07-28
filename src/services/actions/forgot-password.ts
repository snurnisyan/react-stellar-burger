import {urlName} from "../../utils/constans";
import {checkResponse} from "../../utils/utils";
import {AppThunk} from "../types";

export const EMAIL_LOADING: "EMAIL_LOADING" = "EMAIL_LOADING";
export const EMAIL_SUCCESS: "EMAIL_SUCCESS" = "EMAIL_SUCCESS";
export const EMAIL_ERROR: "EMAIL_ERROR" = "EMAIL_ERROR";

interface IEmailLoadingAction {
  readonly type: typeof EMAIL_LOADING;
}

interface IEmailSuccessAction {
  readonly type: typeof EMAIL_SUCCESS;
}

interface IEmailErrorAction {
  readonly type: typeof EMAIL_ERROR;
}

export type TForgotPasswordActions = IEmailLoadingAction | IEmailSuccessAction | IEmailErrorAction;

export function postFetch(email: string) {
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

export const postEmailCheck: AppThunk = (email: string) => {
  return function (dispatch) {
    dispatch({
      type: EMAIL_LOADING
    })
    return postFetch(email)
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

