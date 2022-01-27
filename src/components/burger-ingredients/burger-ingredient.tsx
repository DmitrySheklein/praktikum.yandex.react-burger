import React, { FC, useMemo } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

import { useSelector } from "../../types/hooks";
import { getConstructorItems } from "../../services/constructor/selectors";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TProduct } from "../../types/data";

type TBurgerIngredient = {
  product: TProduct;
};

const BurgerIngredient: FC<TBurgerIngredient> = ({ product }) => {
  const location = useLocation();
  const orderState = useSelector(getConstructorItems);

  const getCurrentCount = useMemo(() => {
    return [orderState.bun, ...orderState.ingredients].reduce(
      (acc, current) => {
        if (current?._id === product?._id) {
          return current.type === "bun" ? acc + 2 : acc + 1;
        }
        return acc;
      },
      0
    );
  }, [orderState, product._id]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...product },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });
  return (
    <li
      className={`${styles.ListItem} mb-8 ${
        product.type === "bun" ? "bun-item" : "ingredient-item"
      }`}
      ref={dragRef}
    >
      <Link
        className={`${styles.ListItemLink}`}
        to={{
          pathname: `/ingredients/${product._id}`,
          // This is the trick! This link sets
          // the `background` in location state.
          state: { background: location },
        }}
      >
        {getCurrentCount !== 0 && (
          <Counter count={getCurrentCount} size="default" />
        )}
        <div className={`${styles.ListImgWrap} pl-4 pr-4`}>
          <img src={product.image_large} alt={product.name} />
        </div>
        <div className={`${styles.ListItemPriceWrap} pl-4 pr-4 mt-1 mb-1`}>
          <span
            className={`${styles.ListItemPrice} text text_type_digits-default`}
          >
            {product.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <div className={`${styles.ListItemName} text text_type_main-default`}>
          {product.name}
        </div>
      </Link>
    </li>
  );
};

export default BurgerIngredient;
