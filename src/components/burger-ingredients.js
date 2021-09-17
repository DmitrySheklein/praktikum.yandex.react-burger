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
    </div>
  );
};
export default BurgerIngredients;
