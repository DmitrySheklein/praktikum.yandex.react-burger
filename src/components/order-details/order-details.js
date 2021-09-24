import React from "react";
import PropTypes from "prop-types";
import styles from "./order.module.css";
import done from "../../images/done.png";

const OrderDetails = ({ orderInfo }) => {
  const { order } = orderInfo;
  return (
    <div className={styles.order}>
      <strong className={`${styles.order} text text_type_digits-large mb-8`}>
        {order.number}
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
const OrderDetailsPropTypes = PropTypes.shape({
  order: PropTypes.shape({ number: PropTypes.number.isRequired }).isRequired,
  name: PropTypes.string,
  success: PropTypes.bool,
});

OrderDetails.propTypes = {
  orderInfo: OrderDetailsPropTypes.isRequired,
};
export default OrderDetails;
