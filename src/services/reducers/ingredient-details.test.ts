import {IIngredient} from "../types";
import {ingredientDetailsReducer, TIngredientDetailsState} from "./ingredient-details";
import {REMOVE_INGREDIENT, SET_INGREDIENT} from "../actions/ingredient-details";

describe('ingredient details reducer', () => {
  const initialState: TIngredientDetailsState = {
  ingredient: {} as IIngredient
}
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
