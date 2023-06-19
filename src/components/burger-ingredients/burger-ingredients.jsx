import React, { useState, useEffect, useMemo } from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingredients.module.css";
import IngredientComponent from "../ingredient-component/ingredient-component";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import {transformArrayToMap} from "../../utils/utils";

export default function BurgerIngredients({ ingredients, counterState, setCounterState}) {
  const [current, setCurrent] = useState('булки');

  const buns = useMemo(() => {
      return ingredients.filter((element) => {
        return element.type === "bun";
      });
    }, [ingredients]);
  const sauces = useMemo(() => {
    return ingredients.filter((element) => {
      return element.type === "sauce";
    });
  }, [ingredients]);
  const fillings = useMemo(() => {
    return ingredients.filter((element) => {
      return element.type === "main";
    });
  }, [ingredients]);

  const classNames = {
    ingredientsSection: styles.section,
    title: "text text_type_main-large pt-10 pb-5",
    subtitle: "text text_type_main-medium pt-10 pb-6 m-0",
    ingredientsGrid: styles.grid + " pl-4 pr-1",
    scrollbarContainer: styles.scrollbar__container
  }

  const ingredientsMap = transformArrayToMap({
    array: ingredients,
    keyFunc: ingredient => ingredient._id,
  });

  const chosenIds = Object.keys(counterState);

  const hasBun = chosenIds.some((id) => {
    return ingredientsMap[id].type === 'bun'
  });

  useEffect(() => {
    if (!hasBun && ingredients.length > 0) {
      const defaultBun = ingredients.find((ingredient) => {
        return ingredient.type === 'bun'
      })
      const newState = {...counterState};
      newState[defaultBun._id] = 1;
      setCounterState(newState);
    }
  }, [hasBun, ingredients, counterState, setCounterState]);

  function deleteBun(state) {
    const newState = {};
    Object.keys(state).forEach(id => {
      if (ingredientsMap[id].type !== 'bun') {
        newState[id] = state[id];
      }
    })
    return newState;
  }

  function handleCounterClick(key) {
    let newState = {...counterState};
    if (ingredientsMap[key].type === 'bun') {
      newState = deleteBun(newState);
    }
    newState[key] = (newState[key] || 0) + 1;
    setCounterState(newState);
  }
  if (ingredients.length === 0) {
    return (<></>); // TODO: Loader?
  }

  return (
    <section className={classNames.ingredientsSection}>
      <h2 className={classNames.title}>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={classNames.scrollbarContainer}>
        <h3 key={"buns"} className={classNames.subtitle}>Булки</h3>
        <div className={classNames.ingredientsGrid}>
        { buns.map(bun =>
          <IngredientComponent
            ingredient={bun}
            counterState={counterState}
            handleCounterClick={handleCounterClick}
            key={bun._id}
          />)
        }
        </div>
        <h3 key={"sauces"} className={classNames.subtitle}>Соусы</h3>
        <div className={classNames.ingredientsGrid}>
        { sauces.map(sauce =>
          <IngredientComponent
            ingredient={sauce}
            counterState={counterState}
            handleCounterClick={handleCounterClick}
            key={sauce._id}
          />)
        }
        </div>
        <h3 key={"fillings"} className={classNames.subtitle}>Начинки</h3>
        <div className={classNames.ingredientsGrid}>
        { fillings.map((filling) =>
          <IngredientComponent
            ingredient={filling}
            counterState={counterState}
            handleCounterClick={handleCounterClick}
            key={filling._id}
          />)
        }
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  counterState: PropTypes.objectOf(PropTypes.number).isRequired,
  setCounterState: PropTypes.func.isRequired
}
