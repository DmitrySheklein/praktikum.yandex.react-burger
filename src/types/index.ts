import { ThunkAction } from "redux-thunk";
import { Dispatch, Action, ActionCreator } from "redux";
import store from "../services/store";

import { TIngredient } from "../services/ingredients/action-types";
import { TConstructor } from "../services/constructor/action-type";
import { TOrder } from "../services/order/action-type";
import { TUserUnion } from "../services/user/actions-type";
import { TAuth } from "../services/auth/action-type";
import { TWs } from "../services/websoket/action-type";

export type RootState = ReturnType<typeof store.getState>;
// Типизация всех экшенов приложения
type TApplicationActions =
  | TIngredient
  | TConstructor
  | TOrder
  | TUserUnion
  | TAuth
  | TWs;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = Dispatch<TApplicationActions>;
