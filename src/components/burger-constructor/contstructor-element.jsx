import React, { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  REMOVE_INGREDIENT,
  UPDATE_CONSTRUCTOR,
} from "../../services/constructor/actions";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import styles from "./burger-constructor.module.css";

const ConstructorSubElement = ({ product, index, ingredientsLength }) => {
  console.log(ingredientsLength);
  const dispatch = useDispatch();
  const id = product._id;
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "constrElem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex);
      dispatch({
        type: UPDATE_CONSTRUCTOR,
        payload: {
          dragIndex,
          hoverIndex,
        },
      });
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "constrElem",
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const style = {
    cursor: "move",
  };
  return (
    <div
      className={`${styles.constructorSubListItem} ${
        ingredientsLength < 6 ? "pr-4" : "pr-2"
      }`}
      ref={ref}
      style={{ ...style, opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={product.name}
        price={product.price}
        thumbnail={product.image}
        handleClose={() => {
          dispatch({
            type: REMOVE_INGREDIENT,
            payload: product,
          });
        }}
      />
    </div>
  );
};

export default ConstructorSubElement;
