import React from "react";
import OrderList from "../../components/order-list/order-list";
import styles from "./profile.module.css";

const ProfileOrders = () => {
  return <OrderList className={styles.profileOrders} />;
};

export default ProfileOrders;
