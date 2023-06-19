import React from "react";
import styles from "../ingredient-details/ingredient-details.module.css";
import {ingredientPropType} from "../../utils/prop-types";

export default function IngredientDetails({ ingredient }) {
  const classNames = {
    ingredientContainer: styles.ingredient,
    ingredientImg: " ",
    ingredientTitle: "text text_type_main-medium pt-4 pb-8",
    nutrientsContainer: styles.nutrients__container,
    nutrientsText: styles.nutrients__text + " text text_type_main-default text_color_inactive"
  }

  return (
    <div className={classNames.ingredientContainer}>
      <img className={classNames.ingredientImg} src={ingredient.image_large} alt='заказ подтвержден'/>
      <h3 className={classNames.ingredientTitle}>{ingredient.name}</h3>
      <div className={classNames.nutrientsContainer}>
        <div>
          <p className={classNames.nutrientsText}>Калории,ккал</p>
          <p className={classNames.nutrientsText}>{ingredient.calories}</p>
        </div>
        <div>
          <p className={classNames.nutrientsText}>Белки, г</p>
          <p className={classNames.nutrientsText}>{ingredient.proteins}</p>
        </div>
        <div>
          <p className={classNames.nutrientsText}>Жиры, г</p>
          <p className={classNames.nutrientsText}>{ingredient.fat}</p>
        </div>
        <div>
          <p className={classNames.nutrientsText}>Углеводы, г</p>
          <p className={classNames.nutrientsText}>{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired
}
