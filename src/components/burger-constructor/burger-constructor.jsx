import React, { useMemo, useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import styles from "./burger-constructor.module.css";

import EmptyConstructorElement from "./empty-contstructor-element";
import { useSelector, useDispatch } from "react-redux";
import { getConstructorItems } from "../../services/constructor/selectors";
import { REMOVE_INGREDIENT } from "../../services/constructor/actions";
import { createOrder } from "../../services/order/actions";
import { useDrop } from "react-dnd";
import { ADD_BUN, ADD_INGREDIENT } from "../../services/constructor/actions";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(getConstructorItems);
  const { bun, ingredients } = orderState;
  const [startedOrder, setStartedOrder] = useState(false);
  const startOrderHandle = () => {
    const ingredientsId = [...orderState.ingredients.map(el => el._id)];
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

  const [{ isHoverBun }, dropTargetBun] = useDrop({
    accept: "bun",
    drop(item) {
      console.log(item);
      dispatch({
        type: item.type === "bun" ? ADD_BUN : ADD_INGREDIENT,
        payload: item,
      });
    },
    collect: monitor => ({
      isHoverBun: monitor.isOver(),
    }),
  });
  const outlineBun = isHoverBun ? "1px solid #fff" : "none";

  const [{ isHoverItem }, dropTargetItem] = useDrop({
    accept: "bun",
    drop(itemId) {
      console.log(itemId);
    },
    collect: monitor => ({
      isHoverBun: monitor.isOver(),
    }),
  });
  const outlineItem = isHoverItem ? "1px solid #fff" : "none";
  return (
    <div className={`${styles.block} pt-25 pb-15 pl-4 pr-4`}>
      <div className={`${styles.constructorList} mb-10`}>
        {!bun ? (
          <EmptyConstructorElement
            name="Выберите булки"
            position="noBunsTop"
            ref={dropTargetBun}
            style={{ outline: outlineBun }}
          />
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
                handleClose={() => {
                  dispatch({
                    type: REMOVE_INGREDIENT,
                    payload: product,
                  });
                }}
              />
            </div>
          ))
        ) : (
          <EmptyConstructorElement
            name="Выберите начинку"
            position="noBunsMiddle"
            ref={dropTargetItem}
            style={{ outline: outlineItem }}
          />
        )}

        {!bun ? (
          <EmptyConstructorElement
            name="Выберите булки"
            position="noBunsButtom"
            ref={dropTargetBun}
            style={{ outline: outlineBun }}
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
