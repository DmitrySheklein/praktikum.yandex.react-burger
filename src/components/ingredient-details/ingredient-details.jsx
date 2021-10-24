import React from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BUN, ADD_INGREDIENT } from "../../services/constructor/actions";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/ingredients/selectors";
import Preloader from "../preloader/preloader";

const IngredientDetails = ({ setFunc, withAddButton = false }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredients = useSelector(getIngredients);
  const product = ingredients.find((product) => product._id === id);

  const statProductMap = {
    calories: "Калории,ккал",
    proteins: "Белки,г",
    fat: "Жиры,г",
    carbohydrates: "Углеводы,г",
  };
  const addOnOrderHandler = () => {
    const productType = product.type;

    if (productType === "bun") {
      dispatch({
        type: ADD_BUN,
        payload: product,
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: product,
      });
    }
    setFunc();
  };

  if (!product) {
    return <Preloader />;
  }
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.ImgWrap} mb-4`}>
        <img src={product.image_large} alt={product.name} />
      </div>

      <strong className={`mb-8 text text_type_main-medium`}>
        {product.name}
      </strong>

      <ul className={`${styles.statList} mb-4`}>
        {Object.entries(statProductMap).map(([type, name]) => (
          <li className={`${styles.statItem} mr-5`} key={type}>
            <span
              className={`${styles.statName} text text_type_main-default text_color_inactive`}
            >
              {name}
            </span>
            <span
              className={`text text_type_digits-default text_color_inactive`}
            >
              {product[type]}
            </span>
          </li>
        ))}
      </ul>
      {withAddButton && (
        <Button type="primary" size="large" onClick={addOnOrderHandler}>
          Добавить в бургер
        </Button>
      )}
    </div>
  );
};

IngredientDetails.propTypes = {
  setFunc: PropTypes.func,
  withAddButton: PropTypes.bool,
};

export default IngredientDetails;
