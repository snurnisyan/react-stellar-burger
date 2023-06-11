import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";

export default function ClickableConstructorElement({ extraClass, type, isLocked, text, price, thumbnail, ingredient }) {

  const [ isOpened, setIsOpened ] = React.useState(false);
  const openModal = () => {
    setIsOpened(true);
  }
  const closeModal = () => {
    setIsOpened(false);
  }

  return (
    <div onClick={openModal} key={ingredient._id}>
      <ConstructorElement
        extraClass={extraClass}
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
      />
      <IngredientDetails opened={isOpened} onModalClose={closeModal} ingredient={ingredient}/>
    </div>
  )
}

ClickableConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.bool.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  extraClass: PropTypes.string,
  ingredient: ingredientPropType.isRequired
}
