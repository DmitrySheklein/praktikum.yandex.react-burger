import { React, useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { useDispatch } from "react-redux";
import { getItems } from "../../services/ingredients/actions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ErrorPage404,
} from "../../pages";
import { checkAuth } from "../../services/auth/actions";
import ProtectedRouter from "../protected-router";
import IngredientDetails from "../ingredient-details/ingredient-details";
import AuthProtectedRouter from "../auth-protected-router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Router>
        <AppHeader />
        <main className={`${appStyles.container} ${appStyles.flex}`}>
          <Switch>
            <Route path="/" exact={true}>
              <BurgerIngredients />
              <BurgerConstructor />
            </Route>
            <AuthProtectedRouter path="/login">
              <LoginPage />
            </AuthProtectedRouter>
            <AuthProtectedRouter path="/register">
              <RegisterPage />
            </AuthProtectedRouter>
            <AuthProtectedRouter path="/forgot-password">
              <ForgotPasswordPage />
            </AuthProtectedRouter>
            <AuthProtectedRouter path="/reset-password">
              <ResetPasswordPage />
            </AuthProtectedRouter>
            <ProtectedRouter path={"/profile"}>
              <ProfilePage />
            </ProtectedRouter>
            <Route path="/ingredients/1" exact={true}>
              <IngredientDetails />
            </Route>
            <Route>
              <ErrorPage404 />
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
