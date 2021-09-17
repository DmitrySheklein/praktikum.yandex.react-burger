import React from "react";
import {
  Tab,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = React.useState("one");

  return (
    <div className={`${styles.container} mr-10`}>
      <h2 className={`text text_type_main-large mb-5`}>Соберите бургер</h2>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="one" active={currentTab === "one"} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="two" active={currentTab === "two"} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab
          value="three"
          active={currentTab === "three"}
          onClick={setCurrentTab}
        >
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.ingredientsBlock}`}>
        <li className={`${styles.ingredientsBlockItem}`}>
          <strong
            className={`${styles.ingredientsBlockTitle} text text_type_main-medium`}
          >
            Булки
          </strong>
          <ul className={`${styles.ingredientsList}`}>
            <li className={`${styles.ingredientsListItem}`}>1</li>
            <li className={`${styles.ingredientsListItem}`}>2</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default BurgerIngredients;
