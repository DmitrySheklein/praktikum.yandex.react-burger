import React from "react";
import styles from "./page.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const FeedPage = () => {
  return (
    <div className={styles.feedPage}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.feedPageContainer}>
        <div className={`${styles.feedPageCol} mr-15`}>
          <ul
            className={`${styles.orderList} ${styles.feedPageOrderList} custom-scroll pr-2`}
          >
            {Array(10)
              .fill("")
              .map(() => (
                <li className={`${styles.orderItem} pt-6 pr-6 pb-6 pl-6`}>
                  <div className={`${styles.orderItemHeader} mb-6`}>
                    <span className={`text text_type_digits-default`}>
                      #034535
                    </span>
                    <span
                      className={`text text_type_main-default text_color_inactive`}
                    >
                      Сегодня, 16:20 i-GMT+3
                    </span>
                  </div>
                  <h2 className={`text text_type_main-medium mb-6`}>
                    Death Star Starship Main бургер
                  </h2>
                  <div className={`${styles.orderItemInfo}`}>
                    <ul className={`${styles.ingredientsList}`}>
                      <li className={`${styles.ingredientsListItem}`}>1</li>
                      <li className={`${styles.ingredientsListItem}`}>2</li>
                      <li className={`${styles.ingredientsListItem}`}>3</li>
                    </ul>
                    <span className={`${styles.orderItemPrice} ml-6`}>
                      <span
                        className={`${styles.orderItemPriceNum} text text_type_digits-default`}
                      >
                        480
                      </span>
                      <CurrencyIcon type="primary" />
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.feedPageCol}>
          <div className={`${styles.orders} mb-15`}>
            <div className={`${styles.orderCol} mr-9`}>
              <span
                className={`${styles.orderColTitle} text text_type_main-medium mb-6`}
              >
                Готовы
              </span>
              <ul className={`${styles.orderColList}`}>
                {Array(5)
                  .fill("")
                  .map(() => (
                    <li
                      className={`${styles.orderColListItem} ${styles.ready} text text_type_digits-default mb-2`}
                    >
                      034533
                    </li>
                  ))}
              </ul>
            </div>
            <div className={`${styles.orderCol}`}>
              <span
                className={`${styles.orderColTitle} text text_type_main-medium mb-6`}
              >
                В работе
              </span>
              <ul className={`${styles.orderColList}`}>
                {Array(5)
                  .fill("")
                  .map(() => (
                    <li
                      className={`${styles.orderColListItem} text text_type_digits-default mb-2`}
                    >
                      034533
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="mb-15">
            <span className="text text_type_main-medium">
              Выполнено за все время:
            </span>
            <span
              className={`${styles.totalBlockNum} text text_type_digits-large`}
            >
              28 752
            </span>
          </div>

          <div className="mb-15">
            <span className="text text_type_main-medium">
              Выполнено за сегодня:
            </span>
            <span
              className={`${styles.totalBlockNum} text text_type_digits-large`}
            >
              138
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
