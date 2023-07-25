import React, {ReactElement, useMemo} from "react";
import styles from "./scrollable-feed.module.css"
import {IClassNames, TOrdersMap} from "../../utils/types";
import OrderCardComponent from "../order-card/order-card";
import {IIngredient, IWSOrder} from "../../services/types";
import {useDispatch} from "../../services/hooks/useDispatch";
import {SET_ORDER} from "../../services/actions/order-info";


type TScrollableFeedComponentProps = {
  status?: boolean;
  orders: Array<IWSOrder>;
  modalPath: string;
}

export default function ScrollableFeedComponent({status, orders, modalPath}: TScrollableFeedComponentProps): ReactElement {
  const classNames: IClassNames = {
    scrollbarContainer: styles.scrollbar__container + " pr-2"
  }

  const dispatch = useDispatch();

  const ordersMap = useMemo(() => {
    const mapped: TOrdersMap = {};
    orders.forEach((order) => {
      mapped[order._id] = order;
    });
    return mapped;
  }, [orders]);

  function handleOrderClick(key: string): void {
    dispatch({
      type: SET_ORDER,
      order: ordersMap[key]
    })
  }

  if (!orders || orders.length === 0) {
    return (<></>); // TODO: Loader?
  }

  return (
    <div className={classNames.scrollbarContainer}>
      {orders.map((order) =>
        <OrderCardComponent status={status} key={order._id} order={order} handleOrderClick={handleOrderClick} modalPath={modalPath}/>
      )}
    </div>
  )
}
