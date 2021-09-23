import React, { useContext } from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderContext } from "../../services/orderContext";

const IngredientDetails = ({ product, setFunc }) => {
  const { orderDispatcher } = useContext(OrderContext);
  const statProductMap = {
    calories: "Калории,ккал",
    proteins: "Белки,г",
    fat: "Жиры,г",
    carbohydrates: "Углеводы,г",
  };
  const addOnOrderHandler = () => {
    const dispatherType = product.type === "bun" ? product.type : "ingredients";
    orderDispatcher({ type: dispatherType, payload: product._id });
    setFunc(false);
  };
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
  product: PropTypes.shape({
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    name: PropTypes.string,
    image_large: PropTypes.string,
  }).isRequired,
};

export default IngredientDetails;
