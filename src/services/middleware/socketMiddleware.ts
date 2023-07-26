import {IWSActions, RootState} from "../types";
import type {Middleware, MiddlewareAPI} from 'redux';
import {Dispatch} from "redux";
import {TWSActions, TWSAuthActions} from "../actions/wsActions";

export const socketMiddleware = (wsUrl: string, wsActions: IWSActions): Middleware => {
  return (store: MiddlewareAPI<Dispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSActions | TWSAuthActions) => {
      const {dispatch} = store;
      const {type, payload} = action;
      const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          const {success, ...restParsedData} = parsedData;
          dispatch({type: onMessage, payload: restParsedData});
        };

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };
      }

      next(action);
    };
  };
};
