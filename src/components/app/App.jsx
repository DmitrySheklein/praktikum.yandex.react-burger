import { React, useState, useReducer, useEffect } from "react";
import "./App.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ProductsContext } from "../../services/productsContext";
import { OrderContext } from "../../services/orderContext";

const orderInitialState = { bun: null, ingredients: [] };
function reducer(state, action) {
  // console.log(action.payload);
  switch (action.type) {
    case "bun":
      return { ...state, bun: action.payload };
    case "ingredients":
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case "remove":
      const { _id } = action.payload;
      let deleted = false
      return {...state, ingredients: state.ingredients.filter(el=>{
        if(el._id === _id && !deleted){
          deleted = true;
          return false 
        }
        return true
      })};

    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const [productsData, setProductsData] = useState([]);
  const [orderState, orderDispatcher] = useReducer(reducer, orderInitialState);

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
        // orderDispatcher({ type: "bun", payload: "60d3b41abdacab0026a733c6" });
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
        <OrderContext.Provider value={{ orderState, orderDispatcher }}>
          <ProductsContext.Provider value={{ productsData }}>
            <BurgerIngredients />
            <BurgerConstructor />
          </ProductsContext.Provider>
        </OrderContext.Provider>
      </main>
    </div>
  );
}

export default App;
