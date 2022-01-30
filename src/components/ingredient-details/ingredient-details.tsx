import React, { FC } from "react";
import styles from "./ingredient-details.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../types/hooks";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/ingredients/selectors";
import Preloader from "../preloader/preloader";
import { TProduct } from "../../types/data";
import {
  addBunAction,
  addIngredientAction,
} from "../../services/constructor/action-type";

type TIngredientDetails = {
  setFunc?: () => void;
  withAddButton?: boolean;
};

const IngredientDetails: FC<TIngredientDetails> = ({
  setFunc = () => {},
  withAddButton = false,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();
  const ingredients = useSelector(getIngredients);
  const product = ingredients.find((product: TProduct) => product._id === id);

  interface IStatProductMap {
    [propertyName: string]: string;
  }
  const statProductMap: IStatProductMap = {
    calories: "Калории,ккал",
    proteins: "Белки,г",
    fat: "Жиры,г",
    carbohydrates: "Углеводы,г",
  };
  const addOnOrderHandler = () => {
    if (product) {
      const productType = product.type;

      if (productType === "bun") {
        dispatch(addBunAction(product));
      } else {
        dispatch(addIngredientAction(product));
      }
    }
    setFunc();
  };

  if (!product) {
    return <Preloader />;
  }
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.ImgWrap} mb-4`}>
        <img src={product.image_large} alt={product.name} />
      </div>

      <strong className={`mb-8 text text_type_main-medium`}>
        {product.name}
      </strong>

      <ul className={`${styles.statList} mb-4`}>
        {Object.entries(statProductMap).map(([type, name]) => (
          <li className={`${styles.statItem} mr-5`} key={type}>
            <span
              className={`${styles.statName} text text_type_main-default text_color_inactive`}
            >
              {name}
            </span>
            <span
              className={`text text_type_digits-default text_color_inactive`}
            >
              {product[type as keyof TProduct]}
            </span>
          </li>
        ))}
      </ul>
      {withAddButton && (
        <Button type="primary" size="large" onClick={addOnOrderHandler}>
          Добавить в бургер
        </Button>
      )}
    </div>
  );
};

export default IngredientDetails;
