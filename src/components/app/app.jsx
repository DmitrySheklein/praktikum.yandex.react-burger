import { React, useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/ingredients/actions";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ErrorPage404,
} from "../../pages";
import { checkAuth } from "../../services/auth/actions";
import ProtectedRoute from "../ProtectedRoute";
import { getIsAuth } from "../../services/auth/selectors";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  console.log(isAuth, "isAuth");
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
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/register" exact={true}>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPasswordPage />
            </Route>
            <ProtectedRoute path="/profile">
              <ProfilePage />
            </ProtectedRoute>
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
