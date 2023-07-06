import {DATA_FAILED, DATA_LOADING, DATA_SUCCESS} from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  loading: false,
  error: false
}

export const ingredientsReducer = (state = initialState, action) => {
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
