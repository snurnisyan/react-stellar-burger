import {DATA_FAILED, DATA_LOADING, DATA_SUCCESS, TBurgerIngredientsActions} from "../actions/burger-ingredients";
import {TIngredients} from "../types";

type TBurgerIngredientsState = {
  ingredients: TIngredients;
  loading: boolean;

  error: boolean | null;
}

const initialState: TBurgerIngredientsState = {
  ingredients: [],
  loading: false,
  error: false
}

export const ingredientsReducer = (state = initialState, action: TBurgerIngredientsActions) => {
  switch (action.type) {
    case DATA_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        loading: false,
        error: false
      }
    }
    case DATA_LOADING: {
      return {
        ...state,
        loading: true,
        error: false
      }
    }
    case DATA_FAILED: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
    default: {
      return state;
    }
  }
}
