import React, {useState} from "react";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {postData} from "../../services/actions/order-details";


export default function OrderButton({enabled}) {

  const [ isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();
  const {chosenIngredients} = useSelector(store => ({
    chosenIngredients: store.chosenIngredients.chosenIngredients
  }));

  const chosenIds = chosenIngredients.map(ingredient => ingredient._id);
  const openModal = () => {
    setIsOpened(true);
    dispatch(postData(chosenIds))
  }

  const closeModal = () => {
    setIsOpened(false);
  }

  return (
    <>
      <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={openModal} disabled={!enabled}>
        Оформить заказ
      </Button>
      <OrderDetails opened={isOpened} onModalClose={closeModal}/>
    </>
  )
}
