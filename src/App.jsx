import {React, useState, useEffect} from "react";
import "./App.css";
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import {data as fakeData} from './utils/data.js';

function App() {
  const [productsData, setProductsData] = useState([]);

  useEffect(()=>{
    setProductsData(fakeData)
  },[]);

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
