import Modal from "../modal/modal";
import React, {ReactElement, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import OrderComponent from "../order-component/order-component";
import {useDispatch} from "../../services/hooks/useDispatch";
import {REMOVE_ORDER, SET_ORDER} from "../../services/actions/order-info";
import {IWSOrder} from "../../services/types";
import {isEmpty} from "../../utils/utils";
import {useSelector} from "../../services/hooks/useSelector";

type TOrderInfoModalComponentProps = {
  orders: Array<IWSOrder>;
}

export default function OrderInfoModal({orders}: TOrderInfoModalComponentProps): ReactElement {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { chosenOrder } = useSelector((store) => ({
    chosenOrder: store.chosenOrder.orderInfo
  }));

  const orderIsEmpty = isEmpty(chosenOrder);
  const opened = !orderIsEmpty;
  useEffect(() => {
    if (orderIsEmpty && id) {
      const foundOrder = orders.find((order: IWSOrder) => order._id === id);
      if (!foundOrder || isEmpty(foundOrder)) {
        return;
      }
      dispatch({
        type: SET_ORDER,
        order: foundOrder,
      })
    }
  }, [orders]);

  const closeModal = () => {
    dispatch({
      type: REMOVE_ORDER
    });
    navigate(-1);
  }

  return (
    <Modal opened={opened} onModalClose={closeModal} header={`#${chosenOrder.number}`} headerClassName={"text text_type_digits-default"}>
      <OrderComponent orders={orders}/>
    </Modal>
  )
}
