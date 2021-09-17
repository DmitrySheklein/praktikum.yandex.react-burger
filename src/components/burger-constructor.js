import React from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const img = "https://code.s3.yandex.net/react/code/bun-02.png";
  const img2 = "https://code.s3.yandex.net/react/code/sauce-02.png";
  return (
    <div className={`${styles.constructorBlock} pt-25 pb-15 pl-4 pr-4`}>
      <div className={`${styles.constructorList} mb-10`}>
        <div className={`${styles.constructorListItem} pr-8 pl-6`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </div>
        <div className={`${styles.constructorSubList} pr-4 custom-scroll`}>
          {new Array(10).fill("").map((el) => (
            <div className={`${styles.constructorListItem}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Соус традиционный галактический"
                price={50}
                thumbnail={img2}
              />
            </div>
          ))}
        </div>
        <div className={`${styles.constructorListItem} pr-8 pl-6`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
      </div>
      <div className={`${styles.constructorTotal}`}>
        <div className={`${styles.constructorTotalPrice} mr-10`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
export default BurgerConstructor;
