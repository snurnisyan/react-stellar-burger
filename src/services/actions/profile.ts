import {urlName} from "../../utils/constans";
import {checkResponse, ForbiddenError, getCookie} from "../../utils/utils";
import {postTokenUpdate} from "./update-token";
import {AppThunk, IUser} from "../types";

export const USER_LOADING: "USER_LOADING" = "USER_LOADING";
export const USER_SUCCESS: "USER_SUCCESS" = "USER_SUCCESS";
export const USER_ERROR: "USER_ERROR" = "USER_ERROR";

interface IUserLoadingAction {
  readonly type: typeof USER_LOADING;
}

interface IUserSuccessAction {
  readonly type: typeof USER_SUCCESS;
  readonly user: IUser;
}

interface IUserErrorAction {
  readonly type: typeof USER_ERROR;
  readonly error: boolean | string | null ;
}

export type TUserActions = IUserLoadingAction | IUserSuccessAction | IUserErrorAction;

export function getUserApi() {
  const token = getCookie('token');
  return fetch(`${urlName}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type':'application/json',
      'Authorization': token? 'Bearer ' + token : '',
    }
  })
}

export function patchUserApi({ email, name, password }: { email: string, name: string, password: string }) {
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

export const getUser: AppThunk<Promise<void>> = () => {
  return function (dispatch) {
    dispatch({
      type: USER_LOADING
    })
    return getUserApi()
      .then(checkResponse)
      .then(resJson => {
        if (resJson.success) {
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
        if (err instanceof ForbiddenError) {
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

export const patchUser: AppThunk = ({ email, name, password }: { email: string, name: string, password: string }) => {
  return function (dispatch) {
    dispatch({
      type: USER_LOADING
    })
    return patchUserApi({ email, name, password })
      .then(checkResponse)
      .then(resJson => {
        if (resJson.success) {
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
        if (err instanceof ForbiddenError) {
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

