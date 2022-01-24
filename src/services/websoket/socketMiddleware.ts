import { Middleware } from "redux";
import { getCookie } from "../../utils/cookie";
import { TWsActions } from "./action-type";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: typeof TWsActions
): Middleware<{}> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, withToken } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const accessCookie = getCookie("accessToken");
      const token = withToken ? accessCookie : "";

      if (type === wsInit) {
        socket = new WebSocket(
          withToken ? `${wsUrl}?token=${token}` : `${wsUrl}/all`
        );
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, wsError: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, messages: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
