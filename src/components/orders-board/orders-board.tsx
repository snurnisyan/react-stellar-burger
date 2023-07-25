import React, {ReactElement, useMemo} from "react";
import styles from "./orders-board.module.css"
import {IClassNames} from "../../utils/types";
import {useSelector} from "../../services/hooks/useSelector";

export default function OrdersBoardComponent(): ReactElement {
  const classNames: IClassNames = {
    boardSection: styles.board + " pl-15",
    currentOrders: styles.current__orders,
    orderNumbersContainer: styles.numbers__container,
    header: "text text_type_main-medium",
    statusBoard: styles.status__container,
    orderDigits: "text text_type_digits-default mb-2",
    orderTotal: styles.orders__total + " text text_type_digits-large",
  }
  const { total, totalToday, orders } = useSelector(store => ({
    total: store.wsData.total,
    totalToday: store.wsData.totalToday,
    orders: store.wsData.orders,
  }));

  const ordersInProgress = useMemo(() => {
    return orders.filter((order) => order.status === 'pending').map((order) => order.number).slice(0, 20);
  }, [orders]);

  const ordersDone = useMemo(() => {
    return orders.filter((order) => order.status === 'done').map((order) => order.number).slice(0, 20);
  }, [orders]);

  return (
    <section className={classNames.boardSection}>
      <div className={classNames.currentOrders}>
        <div className={classNames.orderNumbersContainer}>
          <h3 className={classNames.header + " pb-6"}>Готовы:</h3>
          <div className={classNames.statusBoard}>
            {ordersDone.map((order) =>
              <p className={classNames.orderDigits} style={{color: '#00CCCC'}} key={order}>{order}</p>
            )}
          </div>
        </div>
        <div className={classNames.orderNumbersContainer}>
          <h3 className={classNames.header + " pb-6"}>В работе:</h3>
          <div className={classNames.statusBoard}>
            {ordersInProgress.map((order) =>
              <p className={classNames.orderDigits} key={order}>{order}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <p className={classNames.header}>Выполнено за все время:</p>
        <p className={classNames.orderTotal}>{total}</p>
      </div>
      <div>
        <p className={classNames.header}>Выполнено за сегодня:</p>
        <p className={classNames.orderTotal}>{totalToday}</p>
      </div>
    </section>
  )
}
