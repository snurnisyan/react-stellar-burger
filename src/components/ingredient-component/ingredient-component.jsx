import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import styles from "../ingredient-component/ingredient-component.module.css";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";

export default function IngredientComponent({ ingredient, handleIngredientClick }) {

  const classNames = {
    imageContainer: styles.image__container,
    ingredientContainer: styles.ingredient__container + " pb-8",
    priceContainer: styles.price + " mt-1 mb-1",
    price: "text text_type_digits-default mr-2",
    description: styles.description + " text text_type_main-default",
    image: "pr-4 pl-4",
  }

  const {chosenIngredients} = useSelector(store => ({
    chosenIngredients: store.chosenIngredients.chosenIngredients,
  }));

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient
  });

  const chosenIds = [];

  chosenIngredients.map(ingredient => {
    return chosenIds.push(ingredient._id);
  })

  const filteredIds = chosenIds.filter(id => ingredient._id === id);


  return (
    <div className={classNames.ingredientContainer} onClick={() => { handleIngredientClick(ingredient._id) }} ref={dragRef}>
      <div className={classNames.imageContainer}>
        <img className={classNames.image} src={ingredient.image} alt={ingredient.name} />
        { (filteredIds.length > 0) &&
          <Counter count={filteredIds.length} size="default" extraClass="m-1" />
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
  handleIngredientClick: PropTypes.func.isRequired
}
