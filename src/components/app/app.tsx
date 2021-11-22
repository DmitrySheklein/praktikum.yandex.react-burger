import React, { useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch } from "react-redux";
import { getItems } from "../../services/ingredients/actions";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ErrorPage404,
  FeedPage,
} from "../../pages";
import { checkAuth } from "../../services/auth/actions";
import ProtectedRoute from "../protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import AuthProtectedRoute from "../auth-protected-route";
import Modal from "../modal/modal";
import { Location } from "history";

type TLocationState = {
  background: Location;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    dispatch(checkAuth());
  }, [dispatch]);

  const history = useHistory();
  const location = useLocation<TLocationState>();
  const action = history.action === "PUSH" || history.action === "REPLACE";
  const modalIngredientOpen =
    action && location.state && location.state.background;
  return (
    <>
      <AppHeader />
      <main className={`${appStyles.container} ${appStyles.flex}`}>
        <Switch location={modalIngredientOpen || location}>
          <Route path="/" exact={true}>
            <BurgerIngredients />
            <BurgerConstructor />
          </Route>
          <AuthProtectedRoute path="/login">
            <LoginPage />
          </AuthProtectedRoute>
          <AuthProtectedRoute path="/register">
            <RegisterPage />
          </AuthProtectedRoute>
          <AuthProtectedRoute path="/forgot-password">
            <ForgotPasswordPage />
          </AuthProtectedRoute>
          <AuthProtectedRoute path="/reset-password">
            <ResetPasswordPage />
          </AuthProtectedRoute>
          <Route path="/feed">
            <FeedPage />
          </Route>
          <ProtectedRoute path={"/profile"}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientDetails />
          </Route>
          <Route>
            <ErrorPage404 />
          </Route>
        </Switch>
        {modalIngredientOpen && (
          <Route path="/ingredients/:id">
            <Modal
              visible={!!modalIngredientOpen}
              setFunc={history.goBack}
              headerTitle="Детали ингредиента"
            >
              <IngredientDetails
                setFunc={history.goBack}
                withAddButton={true}
              />
            </Modal>
          </Route>
        )}
      </main>
    </>
  );
}

export default App;
