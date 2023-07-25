import {IIngredient} from "../types";

export const SET_INGREDIENT: 'SET_INGREDIENT' = 'SET_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';

interface ISetIngredientAction {
  readonly type: typeof SET_INGREDIENT;

  readonly ingredient: IIngredient;
}

interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
}

export type TIngredientDetailsActions = ISetIngredientAction | IRemoveIngredientAction;
