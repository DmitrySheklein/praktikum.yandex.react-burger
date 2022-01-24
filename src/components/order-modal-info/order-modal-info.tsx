import React, { FC, useEffect, useState } from "react";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrderInfo } from "../../types/data";
import { useDispatch, useSelector } from "../../types/hooks";
import { getIngredients } from "../../services/ingredients/selectors";
import { formatStatusOrder } from "../../utils/formatStatusOrder";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/websoket/constants";
import { getWsMessages } from "../../services/websoket/selectors";
import { useParams } from "react-router-dom";
import { getTotalOrderSum } from "../../utils/getTotalSum";
import { getFormattedDate } from "../../utils/formateDate";

type TOrderModalInfo = {
  isModal?: boolean;
  orderModal?: {
    order: TOrderInfo;
    totalOrderSum: number;
    orderDate: string;
  };
};
const OrderModalInfo: FC<TOrderModalInfo> = ({
  isModal = false,
  orderModal,
}) => {
  const [orderFull, setOrderFull] = useState(orderModal);
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(getIngredients);
  const message = useSelector(getWsMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orderModal) {
      dispatch({ type: WS_CONNECTION_START, withToken: false });
    }

    return () => {
      if (!orderModal) {
        dispatch({ type: WS_CONNECTION_CLOSED });
      }
    };
  }, [dispatch, orderModal]);

  useEffect(() => {
    if (message) {
      const foundOrder: TOrderInfo = message.orders.find(
        (order: TOrderInfo) => order._id === id
      );
      if (foundOrder) {
        setOrderFull({
          order: foundOrder,
          orderDate: foundOrder.createdAt,
          totalOrderSum: getTotalOrderSum(foundOrder.ingredients, ingredients),
        });
      }
    }
  }, [message, id, ingredients]);

  if (!orderFull || !ingredients) {
    return null;
  }

  const { order } = orderFull;

  interface IOrderListObj {
    [prop: string]: number;
  }
  const orderListObj: IOrderListObj = order.ingredients.reduce(
    (acc: IOrderListObj, current) => {
      if (acc[current]) {
        acc[current] += 1;
      } else {
        acc[current] = 1;
      }
      return acc;
    },
    {}
  );
  return (
    <div className={styles.orderWrap}>
      <p
        className={`${styles.orderNum} ${
          isModal ? styles.left : ""
        } text text_type_digits-default mb-10`}
      >
        #{order.number}
      </p>
      <h2 className={`${styles.orderName} text text_type_main-medium mb-3`}>
        {order.name}
      </h2>
      <p className={`${styles.orderStatus} text text_type_main-default mb-15`}>
        {formatStatusOrder(order.status)}
      </p>
      <p className={`text text_type_main-medium mb-6`}>Состав:</p>
      <ul className={`${styles.orderList} custom-scroll mb-10 pr-6`}>
        {Object.entries(orderListObj).map(([productId, productCount]) => {
          const currentProduct = ingredients.find((el) => el._id === productId);

          if (!currentProduct) {
            return null;
          }
          if (currentProduct.type === "bun") {
            productCount *= 2;
          }
          return (
            <li className={`${styles.orderListItem} mb-4`} key={productId}>
              <div className={`${styles.itemImg} mr-4`}>
                {currentProduct ? (
                  <img src={currentProduct.image} alt={currentProduct.name} />
                ) : null}
              </div>
              <span
                className={`${styles.itemName} text text_type_main-default mr-4`}
              >
                {order.name}
              </span>
              <div className={`${styles.itemTotal}`}>
                <span
                  className={`${styles.itemCount} text text_type_digits-default`}
                >
                  {productCount}
                </span>
                <span className="text text_type_digits-default">x</span>
                <span
                  className={`${styles.itemPrice} text text_type_digits-default`}
                >
                  {currentProduct.price}
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.orderFooter}>
        <div
          className={`${styles.orderTime} text text_type_main-default text_color_inactive`}
        >
          {getFormattedDate(orderFull.orderDate)}
        </div>
        <div className={styles.orderTotal}>
          <span
            className={`${styles.orderTotalPrice} text text_type_digits-default`}
          >
            {orderFull.totalOrderSum}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderModalInfo;
