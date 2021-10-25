import React, { useMemo, useState } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import styles from "./burger-constructor.module.css";

import EmptyConstructorElement from "./empty-contstructor-element";
import ConstructorSubElement from "./contstructor-element";
import { useSelector, useDispatch } from "react-redux";
import { getConstructorItems } from "../../services/constructor/selectors";
import { createOrder } from "../../services/order/actions";
import { useDrop } from "react-dnd";
import { ADD_BUN, ADD_INGREDIENT } from "../../services/constructor/actions";
import { getUser } from "../../services/auth/selectors";
import { Redirect, useLocation } from "react-router-dom";

const BurgerConstructor = () => {
  const location = useLocation();
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const orderState = useSelector(getConstructorItems);
  const { bun, ingredients } = orderState;
  const [startedOrder, setStartedOrder] = useState(false);
  const startOrderHandle = () => {
    if (!user) {
      setStartedOrder(true);
      return;
    }
    const ingredientsId = [...orderState.ingredients.map((el) => el._id)];
    const bunId = orderState.bun?._id || null;
    const orderData = {
      ingredients: [...ingredientsId, bunId],
    };
    dispatch(createOrder(orderData, setStartedOrder));
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

  const [{ canDrop, dragItem }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({
        type: item.type === "bun" ? ADD_BUN : ADD_INGREDIENT,
        payload: item,
      });
    },
    collect: (monitor) => {
      return {
        canDrop: monitor.canDrop(),
        dragItem: monitor.getItem(),
        isHover: monitor.isOver(),
      };
    },
  });
  const dragBuns = canDrop && dragItem && dragItem.type === "bun";
  const dragIngredients = canDrop && dragItem && dragItem.type !== "bun";
  const outline = "1px solid #fff";

  if (startedOrder && !user) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }
  return (
    <div className={`${styles.block} pt-25 pb-15 pl-4`}>
      <div className={`${styles.constructorList} mb-10`} ref={dropTarget}>
        {!bun ? (
          <EmptyConstructorElement
            name="Выберите булки"
            position="noBunsTop"
            style={dragBuns ? { outline } : {}}
          />
        ) : (
          <div className={`${styles.constructorListItem} pr-4 pl-6`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <div className={`${styles.constructorSubList} custom-scroll`}>
          {ingredients.length ? (
            ingredients.map((product, index) => {
              return (
                <ConstructorSubElement
                  product={product}
                  key={product.uuid}
                  index={index}
                  ingredientsLength={ingredients.length}
                />
              );
            })
          ) : (
            <EmptyConstructorElement
              name="Выберите начинку"
              position="noBunsMiddle"
              style={dragIngredients ? { outline } : {}}
            />
          )}
        </div>

        {!bun ? (
          <EmptyConstructorElement
            name="Выберите булки"
            position="noBunsButtom"
            style={dragBuns ? { outline } : {}}
          />
        ) : (
          <div className={`${styles.constructorListItem} pr-4 pl-6`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={`${styles.constructorTotal} mr-4`}>
        {totalOrderSum ? (
          <div className={`${styles.constructorTotalPrice} mr-10`}>
            <p className="text text_type_digits-medium">{totalOrderSum}</p>
            <CurrencyIcon type="primary" />
          </div>
        ) : null}

        {totalOrderSum && bun ? (
          <Button type="primary" size="large" onClick={startOrderHandle}>
            Оформить заказ
          </Button>
        ) : null}

        {startedOrder && (
          <Modal visible={startedOrder} setFunc={setStartedOrder}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
