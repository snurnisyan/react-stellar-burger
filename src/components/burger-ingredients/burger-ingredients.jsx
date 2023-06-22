import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingredients.module.css";
import IngredientComponent from "../ingredient-component/ingredient-component";
import {transformArrayToMap} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {REPLACE_BUN} from "../../services/actions/burger-constructor";
import {SET_INGREDIENT} from "../../services/actions/ingredient-details";
import IngredientModal from "../ingredient-modal/ingredient-modal";
import {useInView} from 'react-hook-inview'
import {tabBunsValue, tabSaucesValue, tabFillingsValue} from "../../utils/constans";

export default function BurgerIngredients() {
  const classNames = {
    ingredientsSection: styles.section,
    title: "text text_type_main-large pt-10 pb-5",
    subtitle: "text text_type_main-medium pt-10 pb-6 m-0",
    ingredientsGrid: styles.grid + " pl-4 pr-1",
    scrollbarContainer: styles.scrollbar__container
  }

  const [current, setCurrent] = useState('булки');

  const refBunsScroll = useRef(null);
  const refSaucesScroll = useRef(null);
  const refFillingsScroll = useRef(null);

  const [refBuns, isVisibleBuns] = useInView({threshold: 0.1});
  const [refSauces, isVisibleSauces] = useInView({threshold: 0.1});
  const [refFillings, isVisibleFillings] = useInView({threshold: 0.1});

  const handleScroll = useCallback((ref, value) => {
    ref.current.scrollIntoView();
    setCurrent(value);
  }, [setCurrent]);

  useEffect(() => {
    let newActiveTab = '';
    if (isVisibleBuns) {
      newActiveTab = tabBunsValue;
    }
    if (isVisibleSauces && !isVisibleBuns) {
      newActiveTab = tabSaucesValue;
    }
    if (!isVisibleBuns && !isVisibleSauces) {
      newActiveTab = tabFillingsValue;
    }
    setCurrent(newActiveTab);
  }, [isVisibleBuns, isVisibleSauces, isVisibleFillings, setCurrent]);

  const dispatch = useDispatch();
  const {ingredients, chosenIngredients} = useSelector(store => ({
    ingredients: store.ingredientsData.ingredients,
    chosenIngredients: store.chosenIngredients.chosenIngredients,
  }));

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

  const ingredientsMap = transformArrayToMap({
    array: ingredients,
    keyFunc: ingredient => ingredient._id,
  });

  const hasBun = useMemo(() => {
    chosenIngredients.some((ingredient) => {
      return ingredientsMap[ingredient._id].type === 'bun'
    });
  }, [chosenIngredients, ingredientsMap]);

  useEffect(() => {
    if (!hasBun && ingredients.length > 0) {
      const defaultBun = ingredients.find((ingredient) => {
        return ingredient.type === 'bun'
      })
      dispatch({
        type: REPLACE_BUN,
        ingredient: defaultBun,
      })
    }
  }, [dispatch, hasBun, ingredients]);

  function handleIngredientClick(key) {
    dispatch({
      type: SET_INGREDIENT,
      ingredient: ingredientsMap[key]
    })
  }

  const bunsCallback = useCallback((value) => handleScroll(refBunsScroll, value), [handleScroll, refBunsScroll]);
  const saucesCallback = useCallback((value) => handleScroll(refSaucesScroll, value), [handleScroll, refSaucesScroll]);
  const fillingsCallback = useCallback((value) => handleScroll(refFillingsScroll, value), [handleScroll, refFillingsScroll]);

  if (ingredients.length === 0) {
    return (<></>); // TODO: Loader?
  }

  return (
    <section className={classNames.ingredientsSection} >
      <IngredientModal />
      <h2 className={classNames.title}>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value={tabBunsValue} active={current === tabBunsValue} onClick={bunsCallback}>
          Булки
        </Tab>
        <Tab value={tabSaucesValue} active={current === tabSaucesValue} onClick={saucesCallback}>
          Соусы
        </Tab>
        <Tab value={tabFillingsValue} active={current === tabFillingsValue} onClick={fillingsCallback}>
          Начинки
        </Tab>
      </div>
      <div className={classNames.scrollbarContainer}>
        <h3 key={"buns"} className={classNames.subtitle} ref={refBunsScroll}>Булки</h3>
        <div className={classNames.ingredientsGrid} ref={refBuns}>
        { buns.map(bun =>
          <IngredientComponent
            ingredient={bun}
            handleIngredientClick={handleIngredientClick}
            key={bun._id}
          />)
        }
        </div>
        <h3 key={"sauces"} className={classNames.subtitle} ref={refSaucesScroll}>Соусы</h3>
        <div className={classNames.ingredientsGrid} ref={refSauces}>
        { sauces.map(sauce =>
          <IngredientComponent
            ingredient={sauce}
            handleIngredientClick={handleIngredientClick}
            key={sauce._id}
          />)
        }
        </div>
        <h3 key={"fillings"} className={classNames.subtitle} ref={refFillingsScroll}>Начинки</h3>
        <div className={classNames.ingredientsGrid} ref={refFillings}>
        { fillings.map((filling) =>
          <IngredientComponent
            ingredient={filling}
            handleIngredientClick={handleIngredientClick}
            key={filling._id}
          />)
        }
        </div>
      </div>
    </section>
  );
}

/*BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  counterState: PropTypes.objectOf(PropTypes.number).isRequired,
  setCounterState: PropTypes.func.isRequired
}*/
