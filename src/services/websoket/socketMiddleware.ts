import { Middleware } from "redux";
import { getCookie } from "../../utils/cookie";
import { TWsActions } from "./action-type";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: typeof TWsActions
): Middleware<{}> => {
  return store => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, withToken } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const token = getCookie("accessToken");

      if (type === wsInit && withToken) {
        socket = new WebSocket(
          withToken ? `${wsUrl}?token=${token}` : `${wsUrl}/all`
        );
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
