import { RESET_CONSTRUCTOR } from "../constructor/actions";
export const name = "order";
export const CREATE_ORDER_REQUEST = "CREATE_ORDER";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";

export const createOrder = (data, setStartedOrder) => {
  return async function (dispatch) {
    const FETCH_URL = "https://norma.nomoreparties.space/api/orders";
    try {
      dispatch({
        type: CREATE_ORDER_REQUEST,
      });
      const res = await fetch(FETCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const isJson =
        res.headers.get("content-type").indexOf("application/json") !== -1;
      if (!res.ok) {
        throw new Error("Ответ сети не ok");
      }
      if (!isJson) {
        throw new Error("Ответ сети не json");
      }
      const json = await res.json();
      if (json.success) {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: json,
        });
        dispatch({
          type: RESET_CONSTRUCTOR,
        });
        setStartedOrder(true);
      }
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: CREATE_ORDER_FAILED,
      });
    }
  };
};
