import React, {ReactElement, useRef} from "react";
import styles from "./draggable-constructor-element.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DELETE_INGREDIENT, UPDATE_ORDER} from "../../services/actions/burger-constructor";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {IClassNames, IIngredient} from "../../utils/types";

interface IDraggableElementProps {
  filling: IIngredient;
  hoverIndex: number;
}
export default function DraggableConstructorElement({filling, hoverIndex}: IDraggableElementProps): ReactElement {
  const classNames: IClassNames = {
    constructorElement: styles.constructor__element + " ml-1",
    dragContainer: styles.drag__container + " mb-4 pr-2",
    icon: styles.icon
  }
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const deleteIngredient = (ingredient: IIngredient) => {
    dispatch({
      type: DELETE_INGREDIENT,
      ingredient: ingredient
    })
  }

  const [, dropFillingTarget] = useDrop({
    accept: "filling",
    hover(filling: IIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = filling.index;
      if (dragIndex === undefined || dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() || {y: 0};
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: UPDATE_ORDER,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
      })
      filling.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragIcon, previewFillingRef] = useDrag({
    type: "filling",
    item: { index: hoverIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
  });

  previewFillingRef(dropFillingTarget(ref));
  const opacity = isDragging ? 0 : 1;
  return (
    <div className={classNames.dragContainer} style={{opacity}} ref={ref}>
      <div className={classNames.icon} ref={dragIcon}>
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        extraClass={classNames.constructorElement}
        text={filling.name}
        price={filling.price}
        thumbnail={filling.image_mobile}
        handleClose={() => deleteIngredient(filling)}
      />
    </div>
  )
}
