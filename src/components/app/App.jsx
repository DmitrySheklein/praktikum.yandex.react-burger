import { React, useEffect } from "react";
import "./App.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch } from "react-redux";
import { LOAD_ITEMS } from "../../services/ingredients/actions";

/* const orderInitialState = { bun: null, ingredients: [] };
function reducer(state, action) {
  // console.log(action.payload);
  switch (action.type) {
    case "reset":
      return { bun: null, ingredients: [] };
    case "bun":
      return { ...state, bun: action.payload };
    case "ingredients":
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case "remove":
      const { _id } = action.payload;
      let deleted = false;
      return {
        ...state,
        ingredients: state.ingredients.filter((el) => {
          if (el._id === _id && !deleted) {
            deleted = true;
            return false;
          }
          return true;
        }),
      };

    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
} */

function App() {
  const dispatch = useDispatch();

  // const [productsData, setProductsData] = useState([]);
  // const [orderState, orderDispatcher] = useReducer(reducer, orderInitialState);

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
        // setProductsData(data);
        // orderDispatcher({ type: "bun", payload: "60d3b41abdacab0026a733c6" });
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
