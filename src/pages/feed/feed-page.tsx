import React, { useEffect, useState } from "react";
import styles from "./feed.module.css";
import OrderList from "../../components/order-list/order-list";
import { useSelector, useDispatch } from "../../types/hooks";
import { EStatus, TOrderInfo } from "../../types/data";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/websoket/constants";
import { getWsMessages } from "../../services/websoket/selectors";
import Preloader from "../../components/preloader/preloader";

const FeedPage = () => {
  const message = useSelector(getWsMessages);
  const [orders, setOrders] = useState<TOrderInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [totalDay, setTotalDay] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, withToken: false });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      console.log(message.orders);
      setOrders(message.orders);
      setTotal(message.total);
      setTotalDay(message.totalToday);
    }
  }, [message]);
  const ordersDone = orders
    .filter((order) => order.status === EStatus.Done)
    .slice(0, 6);
  const ordersPending = orders
    .filter((order) => order.status === EStatus.Pending)
    .slice(0, 6);

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <div className={styles.feedPage}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={styles.feedPageContainer}>
        <div className={`${styles.feedPageCol} mr-15`}>
          <OrderList className={styles.orderList} path="feed" orders={orders} />
        </div>
        <div className={styles.feedPageCol}>
          <div className={`${styles.orders} mb-15`}>
            {ordersDone.length ? (
              <div className={`${styles.orderCol} mr-9`}>
                <span
                  className={`${styles.orderColTitle} text text_type_main-medium mb-6`}
                >
                  Готовы
                </span>
                <ul className={`${styles.orderColList}`}>
                  {ordersDone.map((order) => (
                    <li
                      className={`${styles.orderColListItem} ${styles.ready} text text_type_digits-default mb-2`}
                      key={order._id}
                    >
                      {order.number}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {ordersPending.length ? (
              <div className={`${styles.orderCol}`}>
                <span
                  className={`${styles.orderColTitle} text text_type_main-medium mb-6`}
                >
                  В работе
                </span>
                <ul className={`${styles.orderColList}`}>
                  {ordersPending.map((order) => (
                    <li
                      className={`${styles.orderColListItem} text text_type_digits-default mb-2`}
                      key={order._id}
                    >
                      {order.number}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="mb-15">
            <span className="text text_type_main-medium">
              Выполнено за все время:
            </span>
            <span
              className={`${styles.totalBlockNum} text text_type_digits-large`}
            >
              {total}
            </span>
          </div>

          <div className="mb-15">
            <span className="text text_type_main-medium">
              Выполнено за сегодня:
            </span>
            <span
              className={`${styles.totalBlockNum} text text_type_digits-large`}
            >
              {totalDay}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
