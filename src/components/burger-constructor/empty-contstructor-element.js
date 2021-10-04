import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";

const EmptyConstructorElement = React.forwardRef(
  ({ name, position, style }, ref) => {
    return (
      <div className={`${styles.constructorListItem} pr-8 pl-6`} ref={ref}>
        <div
          style={style}
          className={`${styles.noBuns} ${styles[position]} text text_type_main-default`}
        >
          {name}
        </div>
      </div>
    );
  }
);
EmptyConstructorElement.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
};

export default EmptyConstructorElement;
