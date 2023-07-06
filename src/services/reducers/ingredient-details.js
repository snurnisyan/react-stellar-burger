import {REMOVE_INGREDIENT, SET_INGREDIENT} from "../actions/ingredient-details";

const initialState = {
  ingredient: {}
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT: {
      return {
        ...state,
        ingredient: action.ingredient
      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredient: {}
      }
    }
    default: {
      return state;
    }
  }
}
