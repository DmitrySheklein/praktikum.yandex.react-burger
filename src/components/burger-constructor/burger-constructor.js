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
  const [orderInfo, setOrderInfo] = useState();
  const startOrderHandle = () => {
    const ingredientsId = [...orderState.ingredients.map(el => el._id)];
    const bunId = orderState.bun?._id || null;
    const orderData = {
      ingredients: [...ingredientsId, bunId],
    };
    createOrder(orderData);
  };
  const createOrder = async data => {
    const FETCH_URL = "https://norma.nomoreparties.space/api/orders";
    try {
      const res = await fetch(FETCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const isJson =
        res.headers.get("content-type").indexOf("application/json") !== -1;
      if (!res.ok) {
        throw new Error("Ответ сети не ok");
      }
      if (!isJson) {
        throw new Error("Ответ сети не json");
      }
      const json = await res.json();
      if (json.success) {
        setStatedOrder(!startedOrder);
        setOrderInfo(json);
      }
    } catch (error) {
      console.log(error.message);
    }
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
        {totalOrderSum ? (
          <div className={`${styles.constructorTotalPrice} mr-10`}>
            <p className="text text_type_digits-medium">{totalOrderSum}</p>
            <CurrencyIcon type="primary" />
          </div>
        ) : null}

        {totalOrderSum ? (
          <Button type="primary" size="large" onClick={startOrderHandle}>
            Оформить заказ
          </Button>
        ) : null}

        {startedOrder && orderInfo && (
          <Modal visible={startedOrder} setFunc={setStatedOrder}>
            <OrderDetails orderInfo={orderInfo} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
