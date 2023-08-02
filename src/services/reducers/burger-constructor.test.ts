import {chosenIngredientsReducer, initialState} from "./burger-constructor";
import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  REPLACE_BUN,
  UPDATE_ORDER
} from "../actions/burger-constructor";

describe('constructor reducer', () => {
  it('should return initial state', () => {
    expect(chosenIngredientsReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle ADD_INGREDIENT', () => {
    const action = {
      type: ADD_INGREDIENT,
      ingredient: {test: 1} as any
    }
    expect(chosenIngredientsReducer(initialState, action)).toEqual({
      chosenIngredients: [{test: 1}]
    })
  })

  it('should handle DELETE_INGREDIENT', () => {
    const prevState = {
      chosenIngredients: [{test: 1}, {test: 2}] as any
    };

    const action = {
      type: DELETE_INGREDIENT,
      ingredient: prevState.chosenIngredients[1] as any
    }
    expect(chosenIngredientsReducer(prevState, action)).toEqual({
      chosenIngredients: [{test: 1}]
    })
  })

  it('should handle REPLACE_BUN', () => {
    const prevState = {
      chosenIngredients: [{test: 1, type: 'bun'}] as any
    };

    const action = {
      type: REPLACE_BUN,
      ingredient: {test: 2, type: 'bun'} as any
    }
    expect(chosenIngredientsReducer(prevState, action)).toEqual({
      chosenIngredients: [{test: 2, type: 'bun'}]
    })
  })

  it('should handle UPDATE_ORDER', () => {
    const prevState = {
      chosenIngredients: [{test: 1}, {test: 2}, {test: 3}] as any
    };

    const action = {
      type: UPDATE_ORDER,
      dragIndex: 0,
      hoverIndex: 1
    }
    expect(chosenIngredientsReducer(prevState, action)).toEqual({
      chosenIngredients: [{test: 2}, {test: 1}, {test: 3}]
    })
  })

  it('should handle CLEAR_CONSTRUCTOR', () => {
    const prevState = {
      chosenIngredients: [{test: 1}, {test: 2}, {test: 3}] as any
    };

    const action = { type: CLEAR_CONSTRUCTOR }
    expect(chosenIngredientsReducer(prevState, action)).toEqual({
      chosenIngredients: []
    })
  })
})
