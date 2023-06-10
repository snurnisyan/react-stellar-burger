import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default function IngredientComponent({ ingredient, counterState, handleCounterClick, classNames }) {



  return (
    <div className={classNames.ingredientContainer} onClick={() => { handleCounterClick(ingredient._id) }} key={ingredient._id}>
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
