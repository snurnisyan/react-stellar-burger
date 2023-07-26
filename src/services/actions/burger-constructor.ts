import {IIngredient} from "../types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const REPLACE_BUN: 'REPLACE_BUN' = 'REPLACE_BUN';
export const UPDATE_ORDER: 'UPDATE_ORDER' = 'UPDATE_ORDER';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: IIngredient;
}

interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly ingredient: IIngredient;
}

interface IReplaceBunAction {
  readonly type: typeof REPLACE_BUN;
  readonly ingredient: IIngredient;
}

interface IUpdateOrderAction {
  readonly type: typeof UPDATE_ORDER;
  readonly dragIndex: number;
  readonly hoverIndex: number;

}

interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;

}

export type TBurgerConstructorActions = IAddIngredientAction | IDeleteIngredientAction | IReplaceBunAction | IUpdateOrderAction | IClearConstructorAction
