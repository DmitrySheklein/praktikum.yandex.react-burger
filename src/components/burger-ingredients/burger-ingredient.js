import { React, useState } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredient = ({ product }) => {
  const [modalShow, setModalShow] = useState(false);
  const handleItemClick = () => {
    setModalShow(!modalShow);
  };

  return (
    <li className={`${styles.ListItem} mb-8`} onClick={handleItemClick}>
      {product.count && <Counter count={1} size="default" />}
      <div className={`${styles.ListImgWrap} pl-4 pr-4`}>
        <img src={product.image_large} alt={product.name} />
      </div>
      <div className={`${styles.ListItemPriceWrap} pl-4 pr-4 mt-1 mb-1`}>
        <span
          className={`${styles.ListItemPrice} text text_type_digits-default`}
        >
          {product.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.ListItemName} text text_type_main-default`}>
        {product.name}
      </div>
      {modalShow && (
        <Modal
          visible={modalShow}
          setFunc={setModalShow}
          headerTitle="Детали ингредиента"
        >
          <IngredientDetails product={product} />
        </Modal>
      )}
    </li>
  );
};
export default BurgerIngredient;
