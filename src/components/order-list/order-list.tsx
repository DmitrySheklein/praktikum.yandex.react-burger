import React, { FC, useState } from "react";
import stylesOrderList from "./order-list.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { useLocation, Link } from "react-router-dom";
import { TOrderInfo } from "../../types/data";
import { useSelector } from "../../types/hooks";
import { getIngredients } from "../../services/ingredients/selectors";
import { getTotalOrderSum } from "../../utils/getTotalSum";
import { formatStatusOrder } from "../../utils/formatStatusOrder";
import { getFormattedDate } from "../../utils/formateDate";

type TOrderList = {
  className?: string;
  path: string;
  orders: TOrderInfo[];
  withOrderStatus?: boolean;
};
const OrderList: FC<TOrderList> = ({
  className = "",
  path = "",
  orders,
  withOrderStatus = false,
}) => {
  const ingredients = useSelector(getIngredients);
  const [orderStatus] = useState(true);
  const location = useLocation();
  if (!ingredients || !orders) {
    return null;
  }

  return (
    <ul
      className={`${stylesOrderList.orderList} ${className} custom-scroll pr-2`}
    >
      {orders.map((order) => (
        <li
          className={`${stylesOrderList.orderItem} pt-6 pr-6 pb-6 pl-6`}
          key={order._id}
        >
          <Link
            className={`${styles.ListItemLink}`}
            to={{
              pathname: path ? `/${path}/${order._id}` : "",
              // This is the trick! This link sets
              // the `background` in location state.
              state: {
                background: location,
                orderModal: {
                  order,
                  totalOrderSum: getTotalOrderSum(
                    order.ingredients,
                    ingredients
                  ),
                  orderDate: order.createdAt,
                },
              },
            }}
          >
            <div className={`${stylesOrderList.orderItemHeader} mb-6`}>
              <span className={`text text_type_digits-default`}>
                #{order.number}
              </span>
              <span
                className={`text text_type_main-default text_color_inactive`}
              >
                {getFormattedDate(order.createdAt, order.number)}
              </span>
            </div>
            <h2 className={`text text_type_main-medium mb-6`}>{order.name}</h2>
            {withOrderStatus && orderStatus && (
              <p
                className={`${stylesOrderList.orderStatus} text text_type_main-default mt-2 mb-6`}
              >
                {formatStatusOrder(order.status)}
              </p>
            )}
            <div className={`${stylesOrderList.orderItemInfo}`}>
              <ul className={`${stylesOrderList.ingredientsList}`}>
                {order.ingredients.map((productId, index, array) => {
                  const currentProduct = ingredients.find(
                    (el) => el._id === productId
                  );

                  if (index < 6) {
                    return (
                      <li
                        className={`${stylesOrderList.ingredientsListItem}`}
                        key={index}
                      >
                        {currentProduct ? (
                          <img
                            src={currentProduct.image}
                            alt={currentProduct.name}
                          />
                        ) : null}

                        {index === 5 && array.length > 6 ? (
                          <span
                            className={`${stylesOrderList.ingredientsListItemCount} text text_type_main-default`}
                          >
                            +{array.length - (index + 1)}
                          </span>
                        ) : null}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <span className={`${stylesOrderList.orderItemPrice} ml-6`}>
                <span
                  className={`${stylesOrderList.orderItemPriceNum} text text_type_digits-default`}
                >
                  {getTotalOrderSum(order.ingredients, ingredients)}
                </span>
                <CurrencyIcon type="primary" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
