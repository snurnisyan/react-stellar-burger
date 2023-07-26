import {IWSOrder} from "../types";

export const SET_ORDER: 'SET_ORDER' = 'SET_ORDER';
export const REMOVE_ORDER: 'REMOVE_ORDER' = 'REMOVE_ORDER';

interface ISetOrderAction {
  readonly type: typeof SET_ORDER;

  readonly order: IWSOrder;
}

interface IRemoveOrderAction {
  readonly type: typeof REMOVE_ORDER;
}

export type TOrderInfoActions = ISetOrderAction | IRemoveOrderAction;
