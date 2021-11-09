import React, { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import BurgerIngredient from "./burger-ingredient";
import { useSelector } from "react-redux";
import {
  getIngredients,
  ingredientsIsLoading,
} from "../../services/ingredients/selectors";
import { useInView } from "react-intersection-observer";
import Preloader from "../preloader/preloader";
import { TProduct } from "../../utils/types";

type TCategoryType = {
  name: string;
  ref: (node: Element | null | undefined) => void;
};
type TCategoryTypeMap = {
  [name: string]: TCategoryType;
};

const BurgerIngredients = () => {
  const loadingIngredients = useSelector(ingredientsIsLoading);
  const productsData = useSelector(getIngredients);
  const [currentTab, setCurrentTab] = useState("bun");
  const categoryType: Array<string> = Array.from(
    new Set(productsData.map((product: TProduct) => product?.type))
  );
  const setTab = (tab: string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  const inViewOptions = {
    threshold: 0,
    trackVisibility: true,
    delay: 100,
  };
  const [bunRef, inViewBun] = useInView(inViewOptions);
  const [mainRef, inViewMain] = useInView(inViewOptions);
  const [sauceRef, inViewSauce] = useInView(inViewOptions);

  const categoryTypeMap: TCategoryTypeMap = {
    bun: {
      name: "Булки",
      ref: bunRef,
    },
    sauce: {
      name: "Соусы",
      ref: sauceRef,
    },
    main: { name: "Начинки", ref: mainRef },
  };
  useEffect(() => {
    if (inViewBun) {
      setCurrentTab("bun");
    } else if (inViewSauce) {
      setCurrentTab("sauce");
    } else if (inViewMain) {
      setCurrentTab("main");
    }
  }, [inViewBun, inViewMain, inViewSauce]);
  if (loadingIngredients) {
    return <Preloader />;
  }
  return (
    <div className={`${styles.mainBlock} mr-10`}>
      <h2 className={`text text_type_main-large mb-5`}>Соберите бургер</h2>
      <div className={`${styles.tabs} mb-10`}>
        {Object.entries(categoryTypeMap).map(([type, category]) => (
          <Tab
            value={type}
            active={currentTab === type}
            onClick={setTab}
            key={type}
          >
            {category.name}
          </Tab>
        ))}
      </div>
      <ul className={`${styles.categoryBlock} custom-scroll`}>
        {categoryType.length
          ? categoryType.map((type) => (
              <li
                key={type}
                className={`${styles.categoryBlockItem} mb-10`}
                id={type}
                ref={categoryTypeMap[type].ref}
              >
                <strong className={`mb-6 text text_type_main-medium`}>
                  {categoryTypeMap[type].name}
                </strong>
                <ul className={`${styles.List} pl-4 pr-4`}>
                  {productsData
                    .filter((product: TProduct) => product.type === type)
                    .map((product: TProduct) => (
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

export default BurgerIngredients;
