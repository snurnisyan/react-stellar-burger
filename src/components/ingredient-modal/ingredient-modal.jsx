import Modal from "../modal/modal";
import React from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";


export default function IngredientModal({ ingredient, opened, onModalClose }) {

  return (
    <Modal opened={opened} onModalClose={onModalClose} header={'Детали ингредиента'}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  )
}

IngredientModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
}
