import { React, useContext, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import BurgerIngredient from "./burger-ingredient";
import PropTypes from "prop-types";
import { ProductsContext } from "../../services/productsContext";

const BurgerIngredients = () => {
  const { productsData } = useContext(ProductsContext);
  console.log(productsData);
  const [currentTab, setCurrentTab] = useState("bun");
  const categoryType = Array.from(new Set(productsData.map((el) => el?.type)));
  const categoryTypeMap = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };
  const setTab = (tab) => {
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
          ? categoryType.map((type) => (
              <li
                className={`${styles.categoryBlockItem} mb-10`}
                id={type}
                key={type}
              >
                <strong className={`mb-6 text text_type_main-medium`}>
                  {categoryTypeMap[type]}
                </strong>
                <ul className={`${styles.List} pl-4 pr-4`}>
                  {productsData
                    .filter((el) => el.type === type)
                    .map((product) => (
                      <BurgerIngredient product={product} key={product._id} />
                    ))}
                </ul>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
const productPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  image_large: PropTypes.string,
});

BurgerIngredients.propTypes = {
  productsData: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
