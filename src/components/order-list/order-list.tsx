import React, { FC, useState } from "react";
import stylesOrderList from "./order-list.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import { useLocation, Link } from "react-router-dom";
type TOrderList = {
  className?: string;
  path: string;
};
const OrderList: FC<TOrderList> = ({ className = "", path = "" }) => {
  const [orderStatus] = useState(true);
  const location = useLocation();
  return (
    <ul
      className={`${stylesOrderList.orderList} ${className} custom-scroll pr-2`}
    >
      {Array(10)
        .fill("")
        .map((el, index) => (
          <li
            className={`${stylesOrderList.orderItem} pt-6 pr-6 pb-6 pl-6`}
            key={index}
          >
            <Link
              className={`${styles.ListItemLink}`}
              to={{
                pathname: path ? `/${path}/123` : "/321",
                // This is the trick! This link sets
                // the `background` in location state.
                state: { background: location },
              }}
            >
              <div className={`${stylesOrderList.orderItemHeader} mb-6`}>
                <span className={`text text_type_digits-default`}>#034535</span>
                <span
                  className={`text text_type_main-default text_color_inactive`}
                >
                  Сегодня, 16:20 i-GMT+3
                </span>
              </div>
              <h2 className={`text text_type_main-medium mb-6`}>
                Death Star Starship Main бургер
              </h2>
              {orderStatus && (
                <p
                  className={`${stylesOrderList.orderStatus} text text_type_main-default mt-2 mb-6`}
                >
                  Создан
                </p>
              )}
              <div className={`${stylesOrderList.orderItemInfo}`}>
                <ul className={`${stylesOrderList.ingredientsList}`}>
                  {Array(10)
                    .fill("")
                    .map((el, index, array) => {
                      if (index < 6) {
                        return (
                          <li
                            className={`${stylesOrderList.ingredientsListItem}`}
                            key={index}
                          >
                            {/*{index}*/}
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
                    480
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
