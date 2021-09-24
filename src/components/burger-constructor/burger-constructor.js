import React, { useContext, useMemo, useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";

import EmptyConstructorElement from "./empty-contstructor-element";
import { OrderContext } from "../../services/orderContext";

const BurgerConstructor = () => {
  const { orderState, orderDispatcher } = useContext(OrderContext);
  const { bun, ingredients } = orderState;
  const [startedOrder, setStatedOrder] = useState(false);
  const handleOrder = () => {
    setStatedOrder(!startedOrder);
  };
  const totalOrderSum = useMemo(() => {
    if (!orderState.bun && !orderState.ingredients.length) return 0;
    return [orderState.bun, ...orderState.ingredients].reduce(
      (prev, current) => {
        if (current && current.type) {
          const currentSum =
            prev + (current.type === "bun" ? current.price * 2 : current.price);
          return currentSum;
        }
        return prev + 0;
      },
      0
    );
  }, [orderState]);
  return (
    <div className={`${styles.block} pt-25 pb-15 pl-4 pr-4`}>
      <div className={`${styles.constructorList} mb-10`}>
        {!bun ? (
          <EmptyConstructorElement name="Выберите булки" postions="noBunsTop" />
        ) : (
          <div className={`${styles.constructorListItem} pr-8 pl-6`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        {ingredients.length ? (
          ingredients.map((product, index) => (
            <div className={`${styles.constructorSubListItem}`} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={product.name}
                price={product.price}
                thumbnail={product.image}
                handleClose={() =>
                  orderDispatcher({ type: "remove", payload: product })
                }
              />
            </div>
          ))
        ) : (
          <EmptyConstructorElement
            name="Выберите начинку"
            postions="noBunsMiddle"
          />
        )}

        {!bun ? (
          <EmptyConstructorElement
            name="Выберите булки"
            postions="noBunsButtom"
          />
        ) : (
          <div className={`${styles.constructorListItem} pr-8 pl-6`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={`${styles.constructorTotal}`}>
        <div className={`${styles.constructorTotalPrice} mr-10`}>
          <p className="text text_type_digits-medium">{totalOrderSum}</p>
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
