import { Action, ActionCreator } from "redux";
import { Dispatch } from "redux";

type TApplicationActions = TIngredient;
export type AppDispatch = Dispatch<TApplicationActions>;
// export type AppThunk<ReturnType = void> = ActionCreator<
//   ThunkAction<ReturnType, Action, RootState, TApplicationActions>
// >;
