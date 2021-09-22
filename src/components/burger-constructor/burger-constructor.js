import React, { useContext, useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { ProductsContext } from "../../services/productsContext";

const BurgerConstructor = () => {
  const { productsData } = useContext(ProductsContext);
  const bunSampleObj = productsData.find((el) => el.type === "bun");
  const sampleIngredientsArr = productsData.filter((el) => el.type !== "bun");
  const totalSampleArray = [bunSampleObj, ...sampleIngredientsArr];
  console.log(totalSampleArray);
  const [startedOrder, setStatedOrder] = useState(false);
  const handleOrder = () => {
    setStatedOrder(!startedOrder);
  };
  return (
    <div className={`${styles.block} pt-25 pb-15 pl-4 pr-4`}>
      {/* {bun ? (
        <div className="ml-8 mb-4 mr-5">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            thumbnail={bun.image_mobile}
            price={bun.price}
          />
        </div>
      ) : (
        <div
          className={`${styles.noBuns} ${dragBuns && styles.dragActive} ${
            styles.noBunsTop
          } ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите булки
        </div>
      )} */}
      {productsData.length && bunSampleObj ? (
        <div className={`${styles.constructorList} mb-10`}>
          <div className={`${styles.constructorListItem} pr-8 pl-6`}>
            <div
              className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
            >
              Выберите булки
            </div>
          </div>
          <div className={`${styles.constructorSubList} pr-4 custom-scroll`}>
            {sampleIngredientsArr &&
              sampleIngredientsArr.map((product, index) => (
                <div className={`${styles.constructorSubListItem}`} key={index}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={product.name}
                    price={product.price}
                    thumbnail={product.image}
                  />
                </div>
              ))}
          </div>
          <div className={`${styles.constructorListItem} pr-8 pl-6`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunSampleObj.name}
              price={bunSampleObj.price}
              thumbnail={bunSampleObj.image}
            />
          </div>
        </div>
      ) : null}

      <div className={`${styles.constructorTotal}`}>
        <div className={`${styles.constructorTotalPrice} mr-10`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrder}>
          Оформить заказ
        </Button>
        {startedOrder && (
          <Modal visible={startedOrder} setFunc={setStatedOrder}>
            <OrderDetails />
          </Modal>
        )}
      </div>
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

BurgerConstructor.propTypes = {
  productsData: PropTypes.arrayOf(productPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
