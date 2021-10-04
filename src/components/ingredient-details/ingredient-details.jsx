import React, { useEffect } from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { ADD_BUN, ADD_INGREDIENT } from "../../services/constructor/actions";
import { getCurrentIngredient } from "../../services/currentIngredient/selectors";
import { RESET_CURRENT_INGREDIENT } from "../../services/currentIngredient/actions";

const IngredientDetails = ({ setFunc }) => {
  const dispatch = useDispatch();
  const product = useSelector(getCurrentIngredient);
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
    setFunc(false);
  };
  useEffect(() => {
    return () => {
      dispatch({
        type: RESET_CURRENT_INGREDIENT,
      });
    };
  }, [dispatch]);
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

      <Button type="primary" size="large" onClick={addOnOrderHandler}>
        Добавить в бургер
      </Button>
    </div>
  );
};

IngredientDetails.propTypes = {
  setFunc: PropTypes.func,
};

export default IngredientDetails;
