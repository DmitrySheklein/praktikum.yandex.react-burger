import {React, useState, useEffect} from "react";
import "./App.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const [productsData, setProductsData] = useState([]);

  const FETCH_URL = `https://norma.nomoreparties.space/api/ingredients`;
  
  useEffect(() => {
    const getProductData = async () => {
        try {
          const res = await fetch(FETCH_URL);
          const {data} = await res.json();
          console.log(
            data[0]
          );
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
