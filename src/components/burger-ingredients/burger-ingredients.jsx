import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingredients.module.css";
import IngredientComponent from "../ingredient-component/ingredient-component";

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
    imageContainer: styles.imageContainer,
    ingredientContainer: styles.ingredientContainer + " pb-8",
    priceContainer: styles.price + " mt-1 mb-1",
    price: "text text_type_digits-default mr-2",
    description: styles.description + " text text_type_main-default",
    image: "pr-4 pl-4",
    scrollbarContainer: styles.scrollbarContainer
  }

  const ingredientsMap = {};
  ingredients.forEach((ingredient) => {
    ingredientsMap[ingredient._id] = ingredient;
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
        newState[id] = state[id]
      }
    })
    return newState;
  }

  function handleCounterClick(key) {
    let newState = {...counterState};
    if (ingredientsMap[key].type === 'bun') {
      newState = deleteBun(newState);
    }
    newState[key] = (counterState[key] || 0) + 1;
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
