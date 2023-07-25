import React, {ReactElement, RefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingredients.module.css";
import IngredientComponent from "../ingredient-component/ingredient-component";
import {SET_INGREDIENT} from "../../services/actions/ingredient-details";
import IngredientModal from "../ingredient-modal/ingredient-modal";
import {useInView} from 'react-hook-inview'
import {tabBunsValue, tabFillingsValue, tabSaucesValue} from "../../utils/constans";
import {IClassNames, TIngredientsMap} from "../../utils/types";
import {useSelector} from "../../services/hooks/useSelector";
import {useDispatch} from "../../services/hooks/useDispatch";
import {IIngredient} from "../../services/types";

export default function BurgerIngredients(): ReactElement {
  const classNames: IClassNames = {
    ingredientsSection: styles.section,
    title: "text text_type_main-large pt-10 pb-5",
    subtitle: "text text_type_main-medium pt-10 pb-6 m-0",
    ingredientsGrid: styles.grid + " pl-4 pr-1",
    scrollbarContainer: styles.scrollbar__container
  }

  const [current, setCurrent] = useState<string>('булки');

  const refBunsScroll = useRef<HTMLHeadingElement>(null);
  const refSaucesScroll = useRef<HTMLHeadingElement>(null);
  const refFillingsScroll = useRef<HTMLHeadingElement>(null);

  const [refBuns, isVisibleBuns] = useInView({threshold: 0.1});
  const [refSauces, isVisibleSauces] = useInView({threshold: 0.1});
  const [refFillings, isVisibleFillings] = useInView({threshold: 0.1});

  const dispatch = useDispatch();
  const {ingredients} = useSelector((store) => ({
    ingredients: store.ingredientsData.ingredients
  }));

  const handleScroll = useCallback((ref: RefObject<HTMLHeadingElement>, value: string) => {
    ref.current?.scrollIntoView();
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


  const buns = useMemo(() => {
    return ingredients.filter((element: IIngredient) => {
      return element.type === "bun";
    });
  }, [ingredients]);
  const sauces = useMemo(() => {
    return ingredients.filter((element: IIngredient) => {
      return element.type === "sauce";
    });
  }, [ingredients]);
  const fillings = useMemo(() => {
    return ingredients.filter((element: IIngredient) => {
      return element.type === "main";
    });
  }, [ingredients]);

  const ingredientsMap: TIngredientsMap = useMemo(() => {
    const mapped: TIngredientsMap = {};
    ingredients.forEach((ingredient: IIngredient) => {
      mapped[ingredient._id] = ingredient;
    });
    return mapped;
  }, [ingredients]);

  function handleIngredientClick(key: string): void {
    dispatch({
      type: SET_INGREDIENT,
      ingredient: ingredientsMap[key]
    })
  }

  const bunsCallback = useCallback((value: string) => handleScroll(refBunsScroll, value), [handleScroll, refBunsScroll]);
  const saucesCallback = useCallback((value: string) => handleScroll(refSaucesScroll, value), [handleScroll, refSaucesScroll]);
  const fillingsCallback = useCallback((value: string) => handleScroll(refFillingsScroll, value), [handleScroll, refFillingsScroll]);

  if (ingredients.length === 0) {
    return <p className={"text text_type_main-medium"}>Загрузка...</p>; // TODO: Loader?
  }

  return (
    <section className={classNames.ingredientsSection}>
      <IngredientModal/>
      <h2 className={classNames.title}>Соберите бургер</h2>
      <div style={{display: 'flex'}}>
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
          {buns.map((bun: IIngredient) =>
            <IngredientComponent
              ingredient={bun}
              handleIngredientClick={handleIngredientClick}
              key={bun._id}
            />)
          }
        </div>
        <h3 key={"sauces"} className={classNames.subtitle} ref={refSaucesScroll}>Соусы</h3>
        <div className={classNames.ingredientsGrid} ref={refSauces}>
          {sauces.map((sauce: IIngredient) =>
            <IngredientComponent
              ingredient={sauce}
              handleIngredientClick={handleIngredientClick}
              key={sauce._id}
            />)
          }
        </div>
        <h3 key={"fillings"} className={classNames.subtitle} ref={refFillingsScroll}>Начинки</h3>
        <div className={classNames.ingredientsGrid} ref={refFillings}>
          {fillings.map((filling: IIngredient) =>
            <IngredientComponent
              ingredient={filling}
              handleIngredientClick={handleIngredientClick}
              key={filling._id}
            />)
          }
        </div>
      </div>
    </section>
  )
}
