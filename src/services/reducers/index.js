import {combineReducers} from "redux";
import {ingredientsReducer} from "./burger-ingredients";
import {chosenIngredientsReducer} from "./burger-constructor";
import {ingredientDetailsReducer} from "./ingredient-details";
import {dropTargetReducer} from "./drop-target";
import {orderDetailsReducer} from "./order-details";


export const rootReducer = combineReducers( {
  ingredientsData: ingredientsReducer,
  chosenIngredients: chosenIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  dropTarget: dropTargetReducer,
  orderDetails: orderDetailsReducer
});
