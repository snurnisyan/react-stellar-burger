import React, {ReactElement, useEffect, useState} from "react";
import styles from "../ingredient-details/ingredient-details.module.css";
import {useLocation, useParams} from "react-router-dom";
import {IClassNames} from "../../utils/types";
import {useSelector} from "../../services/hooks/useSelector";
import {IIngredient} from "../../services/types";

export default function IngredientDetails(): ReactElement {
  const classNames: IClassNames = {
    ingredientContainer: styles.ingredient,
    ingredientTitle: "text text_type_main-medium pt-4 pb-8",
    nutrientsContainer: styles.nutrients__container,
    nutrientsText: styles.nutrients__text + " text text_type_main-default text_color_inactive"
  }
  const { id } = useParams();
  const location = useLocation();
  const {ingredients, selectedIngredient} = useSelector((store) => ({
    ingredients: store.ingredientsData.ingredients,
    selectedIngredient: store.ingredientDetails.ingredient
  }));

  const [ingredient, setIngredient] = useState<IIngredient>({} as IIngredient);
  useEffect(() => {
    if (ingredients.length === 0) {
      return;
    }
    if (!location?.state?.background && id) {
      const found = ingredients.find(({ _id }) => _id === id);
      if (found) {
        setIngredient(found);
      }
    } else {
      setIngredient(selectedIngredient);
    }
  }, [id, ingredients, location, selectedIngredient]);

  if (ingredients.length === 0 || Object.keys(ingredient).length === 0) {
    return (<p className={"text text_type_main-medium"}>Загрузка...</p>);
  }

  return (
    <div className={classNames.ingredientContainer}>
      <img src={ingredient.image_large} alt={ingredient.name}/>
      <h3 className={classNames.ingredientTitle}>{ingredient.name}</h3>
      <div className={classNames.nutrientsContainer}>
        <div>
          <p className={classNames.nutrientsText}>Калории,ккал</p>
          <p className={classNames.nutrientsText}>{ingredient.calories}</p>
        </div>
        <div>
          <p className={classNames.nutrientsText}>Белки, г</p>
          <p className={classNames.nutrientsText}>{ingredient.proteins}</p>
        </div>
        <div>
          <p className={classNames.nutrientsText}>Жиры, г</p>
          <p className={classNames.nutrientsText}>{ingredient.fat}</p>
        </div>
        <div>
          <p className={classNames.nutrientsText}>Углеводы, г</p>
          <p className={classNames.nutrientsText}>{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}
