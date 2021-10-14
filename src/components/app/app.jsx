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
  ResetPassword,
  ForgotPassword,
} from "../../pages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={`${appStyles.container} ${appStyles.flex}`}>
        <Router>
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
              <ForgotPassword />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPassword />
            </Route>
            <Route path="/profile" exact={true}>
              <ProfilePage />
            </Route>
          </Switch>
        </Router>
      </main>
    </>
  );
}

export default App;
