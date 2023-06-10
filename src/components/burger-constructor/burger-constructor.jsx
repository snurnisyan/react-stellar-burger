import React from "react";
import styles from "../burger-constructor/burger-constructor.module.css";
import {CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderButton from "../order-button/order-button";
import ClickableConstructorElement from "../clickable-constructor-element/clickable-constructor-element";


export default function BurgerConstructor({ ingredients, ingredientsCounters }) {
  const classNames = {
    constructorSection: styles.section + " pt-25 pl-4 pr-2",
    bunElement: "ml-8 mb-4 mr-2",
    constructorElement: "ml-1",
    dragContainer: styles.dragContainer + " mb-4 pr-2",
    priceContainer: styles.priceContainer,
    scrollbarContainer: styles.scrollbarContainer
  }
  const chosenIds = Object.keys(ingredientsCounters);

  const ingredientsMap = {};
  ingredients.forEach((ingredient) => {
    ingredientsMap[ingredient._id] = ingredient;
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
          <ClickableConstructorElement
            extraClass={classNames.bunElement}
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            ingredient={bun}
          />
          <div className={classNames.scrollbarContainer}>
            { fillings.map((filling, index) => {
            return (
              <div className={classNames.dragContainer} key={index}>
                <DragIcon type="primary"/>
                <ClickableConstructorElement
                  extraClass={classNames.constructorElement}
                  text={filling.name}
                  price={filling.price}
                  thumbnail={filling.image_mobile}
                  ingredient={filling}
                />
              </div>
              )})
            }
          </div>
          <ClickableConstructorElement
            extraClass={classNames.bunElement}
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            ingredient={bun}
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