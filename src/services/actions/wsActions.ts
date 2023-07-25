import {IWSActions, IWSOrdersPayload} from "../types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export const WS_AUTH_CONNECTION_START: 'WS_AUTH_CONNECTION_START' = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_SUCCESS: 'WS_AUTH_CONNECTION_SUCCESS' = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR: 'WS_AUTH_CONNECTION_ERROR' = 'WS_AUTH_CONNECTION_ERROR';
export const WS_AUTH_CONNECTION_CLOSED: 'WS_AUTH_CONNECTION_CLOSED' = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_GET_AUTH_ORDERS: 'WS_GET_AUTH_ORDERS' = 'WS_GET_AUTH_ORDERS';




interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: Event;
}

interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWSGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  payload: IWSOrdersPayload;
}

interface IWSAuthConnectionStartAction {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}

interface IWSAuthConnectionSuccessAction {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

interface IWSAuthConnectionErrorAction {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
  payload: Event;
}

interface IWSAuthConnectionClosedAction {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}

interface IWSGetAuthOrdersAction {
  readonly type: typeof WS_GET_AUTH_ORDERS;
  payload: IWSOrdersPayload;
}

export type TWSActions = IWSConnectionStartAction
                        | IWSConnectionSuccessAction
                        | IWSConnectionErrorAction
                        | IWSConnectionClosedAction
                        | IWSGetOrdersAction;

export type TWSAuthActions = IWSAuthConnectionStartAction
                            | IWSAuthConnectionSuccessAction
                            | IWSAuthConnectionErrorAction
                            | IWSAuthConnectionClosedAction
                            | IWSGetAuthOrdersAction;

export const wsActions: IWSActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS
};

export const wsAuthActions: IWSActions = {
  wsInit: WS_AUTH_CONNECTION_START,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_GET_AUTH_ORDERS
};
