import { React, useState, useContext, useMemo } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { OrderContext } from "../../services/orderContext";

const BurgerIngredient = ({ product }) => {
  const { orderState } = useContext(OrderContext);
  const [modalShow, setModalShow] = useState(false);
  const handleItemClick = () => {
    setModalShow(!modalShow);
  };
  const getCurrentCount = useMemo(() => {
    return [orderState.bun, ...orderState.ingredients].filter(el => {
      if (el) {
        return el._id === product._id;
      }
      return false;
    }).length;
  }, [orderState, product._id]);
  return (
    <li className={`${styles.ListItem} mb-8`} onClick={handleItemClick}>
      {getCurrentCount !== 0 && (
        <Counter count={getCurrentCount} size="default" />
      )}
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
          <IngredientDetails product={product} setFunc={setModalShow} />
        </Modal>
      )}
    </li>
  );
};

BurgerIngredient.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    name: PropTypes.string,
    image_large: PropTypes.string,
  }).isRequired,
};

export default BurgerIngredient;
