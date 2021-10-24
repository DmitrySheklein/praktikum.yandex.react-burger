import { React, useEffect, useState } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/ingredients/actions";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
import Modal from "../modal/modal";
import { getCurrentIngredient } from "../../services/currentIngredient/selectors";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    dispatch(checkAuth());
  }, [dispatch]);

  const currentIngredient = useSelector(getCurrentIngredient);
  console.log(currentIngredient, "currentIngredient");
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;
  console.log(background, "background");
  const action = history.action === "PUSH" || history.action === "REPLACE";
  console.log(action, "action");
  const modalIngredientOpen =
    action && location.state && location.state.background;
  return (
    <>
      <AppHeader />
      <main className={`${appStyles.container} ${appStyles.flex}`}>
        <Switch location={background || location}>
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
          <Route path="/ingredients/:id" exact={true}>
            <IngredientDetails />
          </Route>
          <Route>
            <ErrorPage404 />
          </Route>
        </Switch>
        {currentIngredient && background && (
          <Route path="/ingredients/:id">
            <Modal
              visible={modalShow}
              setFunc={setModalShow}
              headerTitle="Детали ингредиента"
            >
              <IngredientDetails setFunc={setModalShow} />
            </Modal>
          </Route>
        )}
      </main>
    </>
  );
}

export default App;
