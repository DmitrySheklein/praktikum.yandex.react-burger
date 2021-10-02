import { React, useEffect } from "react";
import "./App.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch } from "react-redux";
import { LOAD_ITEMS } from "../../services/ingredients/actions";

function App() {
  const dispatch = useDispatch();

  const FETCH_URL = `https://norma.nomoreparties.space/api/ingredients`;

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await fetch(FETCH_URL);
        const isJson =
          res.headers.get("content-type").indexOf("application/json") !== -1;
        if (!res.ok) {
          throw new Error("Ответ сети не ok");
        }
        if (!isJson) {
          throw new Error("Ответ сети не json");
        }
        const { data } = await res.json();
        dispatch({
          type: LOAD_ITEMS,
          data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    getProductData();
  }, [FETCH_URL, dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <main className="container flex">
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
