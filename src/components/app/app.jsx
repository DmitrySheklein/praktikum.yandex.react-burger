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
import ProtectedRoute from "../protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import AuthProtectedRoute from "../auth-protected-route";

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
            <ProtectedRoute path={"/profile"}>
              <ProfilePage />
            </ProtectedRoute>
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
