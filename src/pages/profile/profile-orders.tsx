import React, { useEffect, useState } from "react";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/websoket/constants";
import { useDispatch, useSelector } from "../../types/hooks";
import { getWsMessages } from "../../services/websoket/selectors";
import { TOrderInfo } from "../../types/data";
import OrderList from "../../components/order-list/order-list";
import styles from "./profile.module.css";
import Preloader from "../../components/preloader/preloader";

const ProfileOrders = () => {
  const message = useSelector(getWsMessages);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<TOrderInfo[]>([]);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, withToken: true });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      console.log(message.orders);
      setOrders(message.orders);
    }
  }, [message]);

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <OrderList
      className={styles.profileOrders}
      path={"profile/orders"}
      orders={orders}
      withOrderStatus
    />
  );
};

export default ProfileOrders;
