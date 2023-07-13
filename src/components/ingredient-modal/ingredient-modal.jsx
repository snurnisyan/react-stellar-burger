import Modal from "../modal/modal";
import React, {useEffect} from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {REMOVE_INGREDIENT, SET_INGREDIENT} from "../../services/actions/ingredient-details";
import {useNavigate, useParams} from "react-router-dom";
import {isEmpty} from "../../utils/utils";

export default function IngredientModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {ingredient, ingredients} = useSelector(store => ({
    ingredient: store.ingredientDetails.ingredient,
    ingredients: store.ingredientsData.ingredients,
  }));


  const ingredientIsEmpty = isEmpty(ingredient);
  const opened = !ingredientIsEmpty;
  useEffect(() => {
    if (ingredientIsEmpty && id) {
      const foundIngredient = ingredients.find(ingredient => ingredient._id === id);
      if (isEmpty(foundIngredient)) {
        return;
      }
      dispatch({
        type: SET_INGREDIENT,
        ingredient: foundIngredient,
      })
    }
  }, [ingredients]);

  function onModalClose() {
    dispatch({
      type: REMOVE_INGREDIENT
    });
    navigate('/');
  }

  return (
    <Modal opened={opened} onModalClose={onModalClose} header={'Детали ингредиента'}>
      <IngredientDetails />
    </Modal>
  )
}
