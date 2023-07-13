import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  REPLACE_BUN,
  UPDATE_ORDER
} from "../actions/burger-constructor";

const initialState = {
  chosenIngredients: []
}

function removeItemOnce(arr, value) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function moveItem(array, fromIndex, toIndex) {
  const deletedItem = array.splice(fromIndex, 1)[0];
  array.splice(toIndex, 0, deletedItem);
  return array;
}

export const chosenIngredientsReducer = (state = initialState, action) => {
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



/*export const chosenIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredientCounters: (() => {
          if (action.id in state.ingredientCounters) {
            state.ingredientCounters[action.id] += 1;
          } else {
            state.ingredientCounters[action.id] = 1;
          }
          return state.ingredientCounters;
        })()
      }
    }
    case DECREASE_INGREDIENT: {
      return {
        ...state,
        ingredientCounters: (() => {
          if (action.id in state.ingredientCounters) {
            state.ingredientCounters[action.id] -= 1;
          }
          return state.ingredientCounters;
        })()
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredientCounters: (() => {
          delete state.ingredientCounters[action.id];
          return state.ingredientCounters;
        })()
      }
    }
    default: {
      return state;
    }
  }
}*/


