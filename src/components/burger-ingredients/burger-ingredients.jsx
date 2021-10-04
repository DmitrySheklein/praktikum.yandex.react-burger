import { React, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import BurgerIngredient from "./burger-ingredient.jsx";
import { useSelector } from "react-redux";
import { getIngredients } from "../../services/ingredients/selectors";
import { InView } from "react-intersection-observer";

const BurgerIngredients = () => {
  const productsData = useSelector(getIngredients);
  const [currentTab, setCurrentTab] = useState("bun");
  const categoryType = Array.from(new Set(productsData.map(el => el?.type)));
  const categoryTypeMap = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };
  const setTab = tab => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={`${styles.mainBlock} mr-10`}>
      <h2 className={`text text_type_main-large mb-5`}>Соберите бургер</h2>
      <div className={`${styles.tabs} mb-10`}>
        {Object.entries(categoryTypeMap).map(([type, name]) => (
          <Tab
            value={type}
            active={currentTab === type}
            onClick={setTab}
            key={type}
          >
            {name}
          </Tab>
        ))}
      </div>
      <ul className={`${styles.categoryBlock} custom-scroll`}>
        {categoryType.length
          ? categoryType.map(type => (
              <InView
                as="li"
                onChange={inView => {
                  if (inView) {
                    setCurrentTab(type);
                  }
                }}
                key={type}
                className={`${styles.categoryBlockItem} mb-10`}
                id={type}
              >
                {({ ref }) => (
                  <div ref={ref}>
                    <strong className={`mb-6 text text_type_main-medium`}>
                      {categoryTypeMap[type]}
                    </strong>
                    <ul className={`${styles.List} pl-4 pr-4`}>
                      {productsData
                        .filter(el => el.type === type)
                        .map(product => (
                          <BurgerIngredient
                            product={product}
                            key={product._id}
                          />
                        ))}
                    </ul>
                  </div>
                )}
              </InView>
            ))
          : null}
      </ul>
    </div>
  );
};

export default BurgerIngredients;
