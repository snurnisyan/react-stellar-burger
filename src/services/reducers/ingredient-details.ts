import {REMOVE_INGREDIENT, SET_INGREDIENT, TIngredientDetailsActions} from "../actions/ingredient-details";
import {IIngredient} from "../types";

type TIngredientDetailsState = {
  ingredient: IIngredient;
}

const initialState: TIngredientDetailsState = {
  ingredient: {} as IIngredient
}

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions): TIngredientDetailsState => {
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
        ingredient: {} as IIngredient
      }
    }
    default: {
      return state;
    }
  }
}
