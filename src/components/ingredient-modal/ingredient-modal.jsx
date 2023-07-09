import Modal from "../modal/modal";
import React from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {REMOVE_INGREDIENT} from "../../services/actions/ingredient-details";

export default function IngredientModal() {
  const dispatch = useDispatch();
  const {ingredient} = useSelector(store => ({
    ingredient: store.ingredientDetails.ingredient
  }));

  const opened = Object.keys(ingredient).length > 0;
  function onModalClose() {
    dispatch({
      type: REMOVE_INGREDIENT
    })
  }

  return (
    <Modal opened={opened} onModalClose={onModalClose} header={'Детали ингредиента'}>
      <IngredientDetails />
    </Modal>
  )
}
