import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import styles from "../ingredient-component/ingredient-component.module.css";

export default function IngredientComponent({ ingredient, counterState, handleCounterClick }) {

  const classNames = {
    imageContainer: styles.image__container,
    ingredientContainer: styles.ingredient__container + " pb-8",
    priceContainer: styles.price + " mt-1 mb-1",
    price: "text text_type_digits-default mr-2",
    description: styles.description + " text text_type_main-default",
    image: "pr-4 pl-4",
  }

  return (
    <div className={classNames.ingredientContainer} onClick={() => { handleCounterClick(ingredient._id) }}>
      <div className={classNames.imageContainer}>
        <img className={classNames.image} src={ingredient.image} alt={ingredient.name}/>
        { (counterState[ingredient._id] > 0) &&
          <Counter count={counterState[ingredient._id]} size="default" extraClass="m-1" />
        }
      </div>
      <div className={classNames.priceContainer}>
        <p className={classNames.price}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={classNames.description}>{ingredient.name}</p>
    </div>
  )
}

IngredientComponent.propTypes = {
  ingredient: ingredientPropType.isRequired,
  counterState: PropTypes.objectOf(PropTypes.number).isRequired,
  handleCounterClick: PropTypes.func.isRequired
}
