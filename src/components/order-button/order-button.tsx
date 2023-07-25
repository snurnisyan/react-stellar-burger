import React, {ReactElement, useState} from "react";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import {postData} from "../../services/actions/order-details";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "../../services/hooks/useDispatch";
import {useSelector} from "../../services/hooks/useSelector";

export default function OrderButton({enabled}: {enabled: boolean}): ReactElement {

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {chosenIngredients, user} = useSelector((store) => ({
    chosenIngredients: store.chosenIngredients.chosenIngredients,
    user: store.authData.user
  }));

  const chosenIds = chosenIngredients.map((ingredient) => ingredient._id);
  const openModal = () => {
    if (Object.keys(user).length > 0) {
      setIsOpened(true);
      dispatch(postData(chosenIds));
    } else {
      navigate('/login');
    }
  }

  const closeModal = () => {
    setIsOpened(false);
    navigate('/');
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
