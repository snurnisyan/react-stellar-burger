import {combineReducers} from "redux";
import {ingredientsReducer} from "./burger-ingredients";
import {chosenIngredientsReducer} from "./burger-constructor";
import {ingredientDetailsReducer} from "./ingredient-details";
import {dropTargetReducer} from "./drop-target";
import {orderDetailsReducer} from "./order-details";
import {forgotPasswordReducer} from "./forgot-password";
import {resetPasswordReducer} from "./reset-password";
import {authReducer} from "./auth";
import {updateTokenReducer} from "./update-token";


export const rootReducer = combineReducers( {
  ingredientsData: ingredientsReducer,
  chosenIngredients: chosenIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  dropTarget: dropTargetReducer,
  orderDetails: orderDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  authData: authReducer,
  updateToken: updateTokenReducer
});
