import React, {useMemo} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../ingredient-component/ingredient-component.module.css";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {checkElementPresence} from "../../utils/utils";
import {Link, useLocation} from 'react-router-dom';
import {IClassNames, IIngredient} from "../../utils/types";

type TIngredientComponentProps = {
  ingredient: IIngredient;
  handleIngredientClick: (key: string) => void ;
}

export default function IngredientComponent({ ingredient, handleIngredientClick }: TIngredientComponentProps) {

  const classNames: IClassNames = {
    imageContainer: styles.image__container,
    ingredientContainer: styles.ingredient__container + " pb-8",
    priceContainer: styles.price + " mt-1 mb-1",
    price: "text text_type_digits-default mr-2",
    description: styles.description + " text text_type_main-default",
    image: "pr-4 pl-4",
  }

  const {chosenIngredients}: {chosenIngredients: IIngredient[]} = useSelector((store: any) => ({
    chosenIngredients: store.chosenIngredients.chosenIngredients,
  }));
  const location = useLocation();
  const hasBun = useMemo(() =>
      checkElementPresence(chosenIngredients, 'bun'),
    [chosenIngredients]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    canDrag() {
      if (ingredient.type === 'bun') {
        return true;
      }
      return hasBun;
    }
  });

  const chosenIds: Array<string> = [];

  chosenIngredients.map((ingredient: IIngredient) => {
    return chosenIds.push(ingredient._id);
  })

  const filteredIds = chosenIds.filter(id => ingredient._id === id);

  return (
    <div className={classNames.ingredientContainer}
         onClick={() => { handleIngredientClick(ingredient._id) }}
         ref={dragRef}
         style={{opacity: (!hasBun && ingredient.type !== 'bun') ? .3 : 1}}
    >
      <Link to={`/ingredients/${ingredient._id}`} state={{ background: location }} style={{ textDecoration: 'none', color: 'white'}}>
      <div className={classNames.imageContainer}>
        <img className={classNames.image} src={ingredient.image} alt={ingredient.name} />
        { (filteredIds.length > 0) &&
          <Counter count={filteredIds.length} size="default" extraClass="m-1" />
        }
      </div>
      <div className={classNames.priceContainer}>
        <p className={classNames.price}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={classNames.description}>{ingredient.name}</p>
      </Link>
    </div>
  )
}
