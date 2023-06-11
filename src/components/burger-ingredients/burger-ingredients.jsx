import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingredients.module.css";
import IngredientComponent from "../ingredient-component/ingredient-component";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import {transformArrayToMap} from "../../utils/utils";

export default function BurgerIngredients({ ingredients, counterState, setCounterState}) {
  const [current, setCurrent] = React.useState('булки');
  if (ingredients.length === 0) {
    return (<></>); // TODO: Loader?
  }
  const buns = ingredients.filter((element) => {
    return element.type === "bun";
  });
  const sauces = ingredients.filter((element) => {
    return element.type === "sauce";
  });
  const fillings = ingredients.filter((element) => {
    return element.type === "main";
  });

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

  if (!hasBun) {
    const defaultBun = ingredients.find((ingredient) => {
      return ingredient.type === 'bun'
    })
    const newState = {...counterState};
    newState[defaultBun._id] = 1;
    setCounterState(newState);
  }

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
        <h3 className={classNames.subtitle}>Булки</h3>
          <div className={classNames.ingredientsGrid}>
            { buns.map(bun =>
              <IngredientComponent
                ingredient={bun}
                counterState={counterState}
                handleCounterClick={handleCounterClick}
                classNames={classNames}
              />)
            }
          </div>
          <h3 className={classNames.subtitle}>Соусы</h3>
            <div className={classNames.ingredientsGrid}>
            { sauces.map(sauce =>
              <IngredientComponent
                ingredient={sauce}
                counterState={counterState}
                handleCounterClick={handleCounterClick}
                classNames={classNames}
              />)
            }
            </div>
          <h3 className={classNames.subtitle}>Начинки</h3>
            <div className={classNames.ingredientsGrid}>
            { fillings.map((filling) =>
              <IngredientComponent
                ingredient={filling}
                counterState={counterState}
                handleCounterClick={handleCounterClick}
                classNames={classNames}
              />)
            }
          </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  counterState: PropTypes.object.isRequired,
  setCounterState: PropTypes.func.isRequired
}
