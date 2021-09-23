import React, { useContext, useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
// import PropTypes from "prop-types";
import EmptyConstructorElement from "./empty-contstructor-element";
import { ProductsContext } from "../../services/productsContext";
import { OrderContext } from "../../services/orderContext";

const BurgerConstructor = () => {
  const { orderState, orderDispatcher } = useContext(OrderContext);
  const { productsData } = useContext(ProductsContext);

  const bunIngredient = productsData.find((el) => el._id === orderState.bun);
  const burgerIngredientsArr = orderState.ingredients.map((id) =>
    productsData.find((el) => el._id === id)
  );
  // const totalSampleArray = [bunIngredient, ...burgerIngredientsArr];
  const [startedOrder, setStatedOrder] = useState(false);
  const handleOrder = () => {
    setStatedOrder(!startedOrder);
  };
  const removeItemHandler = (id, index) => {
    orderDispatcher({ type: "remove", payload: {id, index} });
  };

  return (
    <div className={`${styles.block} pt-25 pb-15 pl-4 pr-4`}>
      <div className={`${styles.constructorList} mb-10`}>
        {!bunIngredient ? (
          <EmptyConstructorElement name="Выберите булки" postions="noBunsTop" />
        ) : (
          <div className={`${styles.constructorListItem} pr-8 pl-6`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunIngredient.name}
              price={bunIngredient.price}
              thumbnail={bunIngredient.image}
            />
          </div>
        )}

        {burgerIngredientsArr.length ? (
          burgerIngredientsArr.map((product, index) => (
            <div className={`${styles.constructorSubListItem}`} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={product.name}
                price={product.price}
                thumbnail={product.image}
                handleClose={() => removeItemHandler(product._id, index)}
              />
            </div>
          ))
        ) : (
          <EmptyConstructorElement
            name="Выберите начинку"
            postions="noBunsMiddle"
          />
        )}

        {!bunIngredient ? (
          <EmptyConstructorElement
            name="Выберите булки"
            postions="noBunsButtom"
          />
        ) : (
          <div className={`${styles.constructorListItem} pr-8 pl-6`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunIngredient.name}
              price={bunIngredient.price}
              thumbnail={bunIngredient.image}
            />
          </div>
        )}
      </div>
      <div className={`${styles.constructorTotal}`}>
        <div className={`${styles.constructorTotalPrice} mr-10`}>
          <p className="text text_type_digits-medium">0</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrder}>
          Оформить заказ
        </Button>
        {startedOrder && (
          <Modal visible={startedOrder} setFunc={setStatedOrder}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </div>
  );
};

/* const productPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  image_large: PropTypes.string,
});

BurgerConstructor.propTypes = {
  productsData: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
}; */

export default BurgerConstructor;
