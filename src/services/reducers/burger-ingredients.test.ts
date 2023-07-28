import {ingredientsReducer, TBurgerIngredientsState} from "./burger-ingredients";
import {DATA_FAILED, DATA_LOADING, DATA_SUCCESS} from "../actions/burger-ingredients";

describe('ingredients reducer', () => {
  const initialState: TBurgerIngredientsState = {
    ingredients: [],
    loading: false,
    error: false
  }

  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle DATA_LOADING', () => {
    expect(ingredientsReducer(initialState, { type: DATA_LOADING })).toEqual(
      {
        ...initialState,
        error: false,
        loading: true
      }
    )
  })
  it('should handle DATA_SUCCESS', () => {
    const action = {
      type: DATA_SUCCESS,
      ingredients: [{test: 1}] as any
    }
    expect(ingredientsReducer(initialState, action)).toEqual({
      ingredients: [{test: 1}] ,
      loading: false,
      error: false
    })
  })
  it('should handle DATA_FAILED', () => {
    expect(ingredientsReducer(initialState, { type: DATA_FAILED })
    ).toEqual({
      ...initialState,
      error: true
    })
  })
})
