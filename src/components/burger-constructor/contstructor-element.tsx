import React, { FC, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../types/hooks";
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { TProduct } from "../../types/data";
import { XYCoord } from "dnd-core";
import {
  removeIngredientAction,
  updateIngredientAction,
} from "../../services/constructor/action-type";
type TConstructorElement = {
  product: TProduct;
  index: number;
  ingredientsLength: number;
};
interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ConstructorSubElement: FC<TConstructorElement> = ({
  product,
  index,
  ingredientsLength,
}) => {
  const dispatch = useDispatch();
  const id = product._id;
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "constrElem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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
      dispatch(updateIngredientAction({ dragIndex, hoverIndex }));
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
    collect: (monitor) => ({
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
          dispatch(removeIngredientAction(product));
        }}
      />
    </div>
  );
};

export default ConstructorSubElement;
