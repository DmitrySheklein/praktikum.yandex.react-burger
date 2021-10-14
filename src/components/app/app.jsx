import { React, useEffect } from "react";
import appStyles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { useDispatch } from "react-redux";
import { getItems } from "../../services/ingredients/actions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginPage } from "../pages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Router>
      <AppHeader />
      <main className={`${appStyles.container} ${appStyles.flex}`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
