import React from "react";
import styles from "./order.module.css";
import done from "../../images/done.png";
import { useSelector } from "../../types/hooks";
import { getOrder } from "../../services/order/selectors";

const OrderDetails = () => {
  const order = useSelector(getOrder);

  return (
    <div className={styles.order}>
      <strong className={`${styles.order} text text_type_digits-large mb-8`}>
        {order?.number}
      </strong>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className="mb-15" src={done} alt="done" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
