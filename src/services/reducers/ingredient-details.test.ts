import {ingredientDetailsReducer, initialState} from "./ingredient-details";
import {REMOVE_INGREDIENT, SET_INGREDIENT} from "../actions/ingredient-details";

describe('ingredient details reducer', () => {
  it('should return initial state', () => {
    expect(ingredientDetailsReducer(undefined, {} as any)).toEqual(initialState)
  })


  it('should handle SET_INGREDIENT', () => {
    const action = {
      type: SET_INGREDIENT,
      ingredient: { test: 1 } as any
    }
    expect(ingredientDetailsReducer(initialState, action)).toEqual({ ingredient: { test: 1 } })
  })

  it('should handle REMOVE_INGREDIENT', () => {
    expect(ingredientDetailsReducer(initialState, { type: REMOVE_INGREDIENT })).toEqual({ ...initialState })
  })
})
