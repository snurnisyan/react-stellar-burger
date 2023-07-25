import React, {ReactElement} from "react";
import styles from "./ingredient-image.module.css";
import {IClassNames} from "../../utils/types";
import {IIngredient} from "../../services/types";


type TIngredientImageComponentProps = {
  ingredient?: IIngredient;
  index: number;
  lastElement?: boolean;
  counter?: number;
}
export default function IngredientImageComponent({ingredient, index, lastElement, counter }: TIngredientImageComponentProps): ReactElement {
  const classNames: IClassNames = {
    imgWrapper: styles.img__wrapper,
    img: styles.img,
    counterContainer: styles.counter__container,
    counter: styles.counter + " text text_type_digits-default",
  }

  const elementStyle: {[name: string]: string} = {
    zIndex: (100 - index).toString(),
    transform: `translateX(-${15 * index}px)`
  }

  return (
    <div className={classNames.imgWrapper} style={elementStyle}>
      {(lastElement && (counter !== undefined) && (counter > 0)) && (
        <div className={classNames.counterContainer}>
           <p className={classNames.counter}>+{counter}</p>
        </div>
      )}
      <img src={ingredient?.image_mobile} className={classNames.img} alt={ingredient?.name}/>
    </div>
  )
}
