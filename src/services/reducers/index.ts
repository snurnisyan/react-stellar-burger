import {combineReducers} from "redux";
import {ingredientsReducer} from "./burger-ingredients";
import {chosenIngredientsReducer} from "./burger-constructor";
import {ingredientDetailsReducer} from "./ingredient-details";
import {orderDetailsReducer} from "./order-details";
import {forgotPasswordReducer} from "./forgot-password";
import {resetPasswordReducer} from "./reset-password";
import {authReducer} from "./auth";
import {updateTokenReducer} from "./update-token";
import {wsReducer} from "./wsReducer";
import {orderInfoReducer} from "./order-info";


export const rootReducer = combineReducers( {
  authData: authReducer,
  ingredientsData: ingredientsReducer,
  chosenIngredients: chosenIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  updateToken: updateTokenReducer,
  wsData: wsReducer,
  chosenOrder: orderInfoReducer
});
