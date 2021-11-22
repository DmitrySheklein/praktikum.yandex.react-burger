import React from "react";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderInfo = () => {
  return (
    <div className={styles.orderWrap}>
      <p className={`${styles.orderNum} text text_type_digits-default mb-10`}>
        #034533
      </p>
      <h2 className={`${styles.orderName} text text_type_main-medium mb-3`}>
        Black Hole Singularity острый бургер
      </h2>
      <p className={`${styles.orderStatus} text text_type_main-default mb-15`}>
        Выполнен
      </p>
      <p className={`text text_type_main-medium mb-6`}>Состав:</p>
      <ul className={`${styles.orderList} custom-scroll mb-10 pr-6`}>
        {Array(6)
          .fill(``)
          .map((el, index) => (
            <li className={`${styles.orderListItem} mb-4`} key={index}>
              <div className={`${styles.itemImg} mr-4`}>{index}</div>
              <span
                className={`${styles.itemName} text text_type_main-default mr-4`}
              >
                Флюоресцентная булка R2-D3
              </span>
              <div className={`${styles.itemTotal}`}>
                <span
                  className={`${styles.itemCount} text text_type_digits-default`}
                >
                  1
                </span>
                <span className="text text_type_digits-default">x</span>
                <span
                  className={`${styles.itemPrice} text text_type_digits-default`}
                >
                  300
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
      </ul>
      <div className={styles.orderFooter}>
        <div
          className={`${styles.orderTime} text text_type_main-default text_color_inactive`}
        >
          Вчера, 13:50 i-GMT+3
        </div>
        <div className={styles.orderTotal}>
          <span
            className={`${styles.orderTotalPrice} text text_type_digits-default`}
          >
            510
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
