import React from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ product }) => {
  const statProductMap = {
    calories: "Калории,ккал",
    proteins: "Белки,г",
    fat: "Жиры,г",
    carbohydrates: "Углеводы,г",
  };
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.ImgWrap} mb-4`}>
        <img src={product.image_large} alt={product.name} />
      </div>
      <strong className={`mb-8 text text_type_main-medium`}>
        {product.name}
      </strong>
      <ul className={`${styles.statList}`}>
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
