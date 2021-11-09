import React, { CSSProperties, FC } from "react";

import styles from "./burger-constructor.module.css";

type TEmptyConstructorElement = {
  name: string;
  position: string;
  style?: CSSProperties;
};
const EmptyConstructorElement: FC<TEmptyConstructorElement> = ({
  name,
  position,
  style,
}) => {
  return (
    <div className={`${styles.constructorListItem} pr-8 pl-6`}>
      <div
        style={style}
        className={`${styles.noBuns} ${styles[position]} text text_type_main-default`}
      >
        {name}
      </div>
    </div>
  );
};

export default EmptyConstructorElement;
