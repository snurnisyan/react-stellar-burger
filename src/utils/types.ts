import {IIngredient, IWSOrder} from "../services/types";

export interface IClassNames {
  [name: string]: string;
}

export type TIngredientsMap = {
  [name: string]: IIngredient;
}

export type TOrdersMap = {
  [name: string]: IWSOrder;
}

export type TGroupedArr = Array<IIngredient & { counter: number }>

export type TGroupedObj = {
  [_id: string]: IIngredient & { counter: number };
}
