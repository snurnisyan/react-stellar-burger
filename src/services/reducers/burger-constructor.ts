import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  REPLACE_BUN,
  TBurgerConstructorActions,
  UPDATE_ORDER
} from "../actions/burger-constructor";
import {IIngredient, TIngredients} from "../types";

export type TConstructorState = {
  chosenIngredients: TIngredients;
}

const initialState: TConstructorState = {
  chosenIngredients: []
}

function removeItemOnce(arr: TIngredients, value: IIngredient) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function moveItem(array: TIngredients, fromIndex: number, toIndex: number) {
  const deletedItem = array.splice(fromIndex, 1)[0];
  array.splice(toIndex, 0, deletedItem);
  return array;
}

export const chosenIngredientsReducer = (state = initialState, action: TBurgerConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        chosenIngredients: [action.ingredient, ...state.chosenIngredients]
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        chosenIngredients: [...removeItemOnce(state.chosenIngredients, action.ingredient)]
      }
    }
    case REPLACE_BUN: {
      return {
        ...state,
        chosenIngredients: [action.ingredient, ...state.chosenIngredients.filter(ingredient => ingredient.type !== 'bun')]
      }
    }
    case UPDATE_ORDER: {
      return {
        ...state,
        chosenIngredients: [...moveItem(state.chosenIngredients, action.dragIndex, action.hoverIndex)]
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        chosenIngredients: []
      }
    }
    default: {
      return state;
    }
  }
}

