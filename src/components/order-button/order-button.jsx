import React from "react";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";


export default function OrderButton() {

  const [ isOpened, setIsOpened] = React.useState(false);

  const openModal = () => {
    setIsOpened(true);
  }

  const closeModal = () => {
    setIsOpened(false);
  }

  return (
    <>
      <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={openModal}>
        Оформить заказ
      </Button>
      <OrderDetails opened={isOpened} onModalClose={closeModal}/>
    </>

  )
}
