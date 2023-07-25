import React, {ReactElement, useEffect} from "react";
import {IClassNames} from "../../utils/types";
import styles from "./order-info.module.css";
import OrderComponent from "../order-component/order-component";
import {IWSOrder} from "../../services/types";
import {useDispatch} from "../../services/hooks/useDispatch";
import {useParams} from "react-router-dom";


type TOrderInfoComponentProps = {
  orders: Array<IWSOrder>;
  socketSettings: {
    open: 'WS_CONNECTION_START' | 'WS_AUTH_CONNECTION_START',
    close: 'WS_CONNECTION_CLOSED' | 'WS_AUTH_CONNECTION_CLOSED',
    payload: string
  };
}

export default function OrderInfoComponent({orders, socketSettings}: TOrderInfoComponentProps): ReactElement {
  const classNames: IClassNames = {
    orderSection: styles.section,
    orderNumber: styles.number + " text text_type_digits-default",
  }

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: socketSettings.open, payload: socketSettings.payload });
    return () => {dispatch({ type: socketSettings.close })};
  }, [dispatch]);
  const foundOrder = orders.find(order => order._id === id);

  if (!foundOrder) {
    return <p className={"text text_type_main-medium"}>Загрузка...</p>
  }

  return (
    <section className={classNames.orderSection}>
      <p className={classNames.orderNumber}>#{foundOrder.number}</p>
      <OrderComponent orders={orders}/>
    </section>
  )
}
