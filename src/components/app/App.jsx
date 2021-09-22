import { React, useState, useEffect } from "react";
import "./App.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ProductsContext } from "../../services/productsContext";

function App() {
  const [productsData, setProductsData] = useState([]);

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
        setProductsData(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getProductData();
  }, [FETCH_URL]);

  return (
    <div className="App">
      <AppHeader />
      <main className="container flex">
        <ProductsContext.Provider value={{ productsData }}>
          <BurgerIngredients />
          <BurgerConstructor />
        </ProductsContext.Provider>
      </main>
    </div>
  );
}

export default App;
