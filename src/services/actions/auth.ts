import {IUser} from "../types";
import {TUserActions} from "./profile";
import {TLogoutActions} from "./logout";

export const AUTH_LOADING: "AUTH_LOADING" = "AUTH_LOADING";
export const AUTH_SUCCESS: "AUTH_SUCCESS" = "AUTH_SUCCESS";
export const AUTH_ERROR: "AUTH_ERROR" = "AUTH_ERROR";

interface IAuthLoadingAction {
  readonly type: typeof AUTH_LOADING;
}

interface IAuthSuccessAction {
  readonly type: typeof AUTH_SUCCESS;
  readonly user: IUser;
  readonly accessToken: string;
  readonly refreshToken: string;
}

interface IAuthErrorAction {
  readonly type: typeof AUTH_ERROR;
  readonly error: boolean | string | null ;
}

export type TAuthActions = IAuthLoadingAction | IAuthSuccessAction | IAuthErrorAction | TUserActions | TLogoutActions;
