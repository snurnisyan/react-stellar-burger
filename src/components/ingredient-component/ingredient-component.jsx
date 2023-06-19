import React, {useState} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import styles from "../ingredient-component/ingredient-component.module.css";
import IngredientModal from "../ingredient-modal/ingredient-modal";

export default function IngredientComponent({ ingredient, counterState, handleCounterClick }) {

  const classNames = {
    imageContainer: styles.image__container,
    ingredientContainer: styles.ingredient__container + " pb-8",
    priceContainer: styles.price + " mt-1 mb-1",
    price: "text text_type_digits-default mr-2",
    description: styles.description + " text text_type_main-default",
    image: "pr-4 pl-4",
  }

  const [ isOpened, setIsOpened ] = useState(false);
  const openModal = () => {
    setIsOpened(true);
  }
  const closeModal = () => {
    setIsOpened(false);
  }

  return (
    <div className={classNames.ingredientContainer} onClick={() => { handleCounterClick(ingredient._id); openModal() }}>
      <IngredientModal opened={isOpened} onModalClose={closeModal} ingredient={ingredient} />
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
