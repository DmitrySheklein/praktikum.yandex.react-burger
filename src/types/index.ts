// import { Action, ActionCreator } from "redux";
import { Dispatch } from "redux";
import { TIngredient } from "../services/ingredients/action-types";
import { TConstructor } from "../services/constructor/action-type";
import { TOrder } from "../services/order/action-type";
import { TUserUnion } from "../services/user/actions-type";

type TApplicationActions = TIngredient | TConstructor | TOrder | TUserUnion;
export type AppDispatch = Dispatch<TApplicationActions>;
// export type AppThunk<ReturnType = void> = ActionCreator<
//   ThunkAction<ReturnType, Action, RootState, TApplicationActions>
// >;
