import React from "react";
import PropTypes from 'prop-types';
import styles from "../burger-constructor/burger-constructor.module.css";
import { CurrencyIcon, DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderButton from "../order-button/order-button";
import { ingredientPropType } from "../../utils/prop-types";
import {transformArrayToMap} from "../../utils/utils";

export default function BurgerConstructor({ ingredients, ingredientsCounters }) {
  const classNames = {
    constructorSection: styles.section + " pt-25 pl-4 pr-2",
    bunElement: "ml-8 mb-4 mr-2",
    constructorElement: styles.constructor__element + " ml-1",
    dragContainer: styles.drag__container + " mb-4 pr-2",
    priceContainer: styles.price__container,
    scrollbarContainer: styles.scrollbar__container
  }
  const chosenIds = Object.keys(ingredientsCounters);

  const ingredientsMap = transformArrayToMap({
    array: ingredients,
    keyFunc: ingredient => ingredient._id,
  });

  const chosenIngredients = [];

  chosenIds.forEach(id => {
    const ingredientCounter = ingredientsCounters[id];
    for (let i = 0; i < ingredientCounter; i++) {
      chosenIngredients.push(ingredientsMap[id]);
    }
  });

  const totalPrice = chosenIngredients.reduce(function(total, ingredient) {
    total = total + ingredient.price;
    return total;
  }, 0);

  const bun = chosenIngredients.find((element) => {
    return element.type === "bun";
  });

  const fillings = chosenIngredients.filter((element) => {
    return element.type !== "bun";
  });


  return (
    <section className={classNames.constructorSection}>
      { (chosenIngredients.length > 0) && (
        <div>
          <ConstructorElement
            extraClass={classNames.bunElement}
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
          <div className={classNames.scrollbarContainer}>
            { fillings.map((filling, index) => {
            return (
              <div className={classNames.dragContainer} key={index}>
                <DragIcon type="primary"/>
                <ConstructorElement
                  extraClass={classNames.constructorElement}
                  text={filling.name}
                  price={filling.price}
                  thumbnail={filling.image_mobile}
                />
              </div>
              )})
            }
          </div>
          <ConstructorElement
            extraClass={classNames.bunElement}
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </div>
      )}
      <div className={classNames.priceContainer}>
        <p className="text text_type_digits-medium">{totalPrice} <CurrencyIcon type="primary"/></p>
        <OrderButton />
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  ingredientsCounters: PropTypes.objectOf(PropTypes.number).isRequired,
}
