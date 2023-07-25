import {store} from "../index";
import {TAuthActions} from "./actions/auth";
import {TBurgerConstructorActions} from "./actions/burger-constructor";
import {TBurgerIngredientsActions} from "./actions/burger-ingredients";
import {TForgotPasswordActions} from "./actions/forgot-password";
import {TIngredientDetailsActions} from "./actions/ingredient-details";
import {TLogoutActions} from "./actions/logout";
import {TOrderDetailsActions} from "./actions/order-details";
import {TUserActions} from "./actions/profile";
import {TResetPasswordActions} from "./actions/reset-password";
import {TTokenUpdateActions} from "./actions/update-token";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {TWSActions, TWSAuthActions} from "./actions/wsActions";
import {TOrderInfoActions} from "./actions/order-info";

export interface IIngredient {
  _id: string;
  name: string;
  price: number;
  type: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  proteins: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
  uuid?: string;
  index?: number;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}
export interface IOrder {
  number: number;
}

export type TIngredients = Array<IIngredient>;

export type RootState = ReturnType<typeof store.getState>;

export type TAppActions = TAuthActions
                  | TBurgerConstructorActions
                  | TBurgerIngredientsActions
                  | TForgotPasswordActions
                  | TIngredientDetailsActions
                  | TLogoutActions
                  | TOrderDetailsActions
                  | TUserActions
                  | TResetPasswordActions
                  | TTokenUpdateActions
                  | TWSActions
                  | TWSAuthActions
                  | TOrderInfoActions;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, Action, TAppActions>>
export type AppDispatch = typeof store.dispatch;

export interface IWSOrder {
  ingredients: Array<string>;
  name: string;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IWSActions {
  wsInit: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string
}

export interface IWSOrdersPayload {
  success?: boolean;
  orders: Array<IWSOrder>;
  total: number;
  totalToday: number;
}
