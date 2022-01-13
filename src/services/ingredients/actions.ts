import { SERVER_URL } from "../../utils/constants";
import {
  IngredientsSuccessAction,
  IngredientsRequestAction,
  IngredientsFailedAction,
} from "./action-types";
import { AppDispatch } from "../../types";

export function getItems() {
  return async function (dispatch: AppDispatch) {
    dispatch(IngredientsRequestAction());
    // Запрашиваем данные у сервера
    try {
      const res = await fetch(`${SERVER_URL}/ingredients`);
      const isJson =
        res.headers.get("content-type").indexOf("application/json") !== -1;
      if (!res.ok) {
        dispatch(IngredientsFailedAction());
        throw new Error("Ответ сети не ok");
      }
      if (!isJson) {
        dispatch(IngredientsFailedAction());
        throw new Error("Ответ сети не json");
      }
      const { data } = await res.json();
      dispatch(IngredientsSuccessAction(data));
    } catch (error) {
      console.log(error.message);
      dispatch(IngredientsFailedAction());
    }
  };
}
