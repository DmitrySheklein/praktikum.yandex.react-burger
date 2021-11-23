import React from "react";
import styles from "./feed.module.css";
import OrderList from "../../components/order-list/order-list";

const FeedPage = () => {
  return (
    <div className={styles.feedPage}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.feedPageContainer}>
        <div className={`${styles.feedPageCol} mr-15`}>
          <OrderList className={styles.orderList} />
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
                  .map((_, index) => (
                    <li
                      className={`${styles.orderColListItem} ${styles.ready} text text_type_digits-default mb-2`}
                      key={index}
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
