import React, { useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ productsData }) => {
  const bunSampleObj = productsData.find(el => el.type === "bun");
  const sampleIngredientsArr = productsData.filter(el => el.type !== "bun");

  const [startedOrder, setStatedOrder] = useState(false);
  const handleOrder = () => {
    setStatedOrder(!startedOrder);
    console.log("click");
  };
  return (
    <div className={`${styles.block} pt-25 pb-15 pl-4 pr-4`}>
      {productsData.length && bunSampleObj ? (
        <div className={`${styles.constructorList} mb-10`}>
          <div className={`${styles.constructorListItem} pr-8 pl-6`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunSampleObj.name}
              price={bunSampleObj.price}
              thumbnail={bunSampleObj.image}
            />
          </div>
          <div className={`${styles.constructorSubList} pr-4 custom-scroll`}>
            {sampleIngredientsArr &&
              sampleIngredientsArr.map(product => (
                <div
                  className={`${styles.constructorSubListItem}`}
                  key={product._id}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={product.name}
                    price={product.price}
                    thumbnail={product.image}
                  />
                </div>
              ))}
          </div>
          <div className={`${styles.constructorListItem} pr-8 pl-6`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunSampleObj.name}
              price={bunSampleObj.price}
              thumbnail={bunSampleObj.image}
            />
          </div>
        </div>
      ) : null}

      <div className={`${styles.constructorTotal}`}>
        <div className={`${styles.constructorTotalPrice} mr-10`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrder}>
          Оформить заказ
        </Button>
        {startedOrder && (
          <Modal visible={startedOrder} setStatedOrder={setStatedOrder}>
            hello Order
          </Modal>
        )}
      </div>
    </div>
  );
};
export default BurgerConstructor;
