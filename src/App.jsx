import {React, useState, useEffect} from "react";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import {data as fakeData} from './utils/data.js';

function App() {
  const [productsData, setProductsData] = useState([]);

  const FETCH_URL = `https://norma.nomoreparties.space/api/ingredients`;
  
  useEffect(() => {
    const getProductData = async () => {
        try {
          const res = await fetch(FETCH_URL);
          const {data} = await res.json();
          setProductsData(data);
        } catch (error) {
          console.log(error.message)
        }
    }

    getProductData();
  },[FETCH_URL])

  return (
    <div className="App">
      <AppHeader />
      <main className="container flex">
        <BurgerIngredients productsData={productsData}/>
        <BurgerConstructor productsData={productsData} />
      </main>
    </div>
  );
}

export default App;
