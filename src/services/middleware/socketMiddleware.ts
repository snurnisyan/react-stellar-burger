import {IWSActions, RootState, TAppActions} from "../types";
import type {Middleware, MiddlewareAPI} from 'redux';
import {Dispatch} from "redux";
import {getCookie} from "../../utils/utils";
import {WS_AUTH_CONNECTION_START} from "../actions/wsActions";

export const socketMiddleware = (wsUrl: string, wsActions: IWSActions): Middleware => {
  return (store: MiddlewareAPI<Dispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TAppActions) => {
      const {dispatch} = store;
      const {type} = action;
      const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
      const token = getCookie("token");
      if (type === wsInit) {
        if (type === WS_AUTH_CONNECTION_START && token) {
          socket = new WebSocket(`${wsUrl}?token=${token}`);
        } else {
          socket = new WebSocket(`${wsUrl}/all`);
        }
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
