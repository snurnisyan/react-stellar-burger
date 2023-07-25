import React, {ReactElement, useEffect} from "react";
import OrderFeedComponent from "../components/order-feed/order-feed";
import OrdersBoardComponent from "../components/orders-board/orders-board";
import {IClassNames} from "../utils/types";
import styles from "./feed.module.css";
import OrderInfoModal from "../components/order-info-modal/order-info-modal";
import {useDispatch} from "../services/hooks/useDispatch";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../services/actions/wsActions";
import {useSelector} from "../services/hooks/useSelector";

type TFeedPageProps = {
  modalPath: string;
}

export default function FeedPage({modalPath}: TFeedPageProps): ReactElement {

  const classNames: IClassNames = {
    mainSection: styles.main,
    header: "text text_type_main-large pt-10 pb-5",
    feedSections: styles.feed__sections,
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {dispatch({ type: WS_CONNECTION_CLOSED })};
  }, [dispatch]);

  const { orders } = useSelector(store => ({
    orders: store.wsData.orders,
  }));

  return (
    <main className={classNames.mainSection}>
      <h2 className={classNames.header}>Лента заказов</h2>
      <div className={classNames.feedSections}>
        <OrderFeedComponent modalPath={modalPath}/>
        <OrderInfoModal orders={orders}/>
        <OrdersBoardComponent />
      </div>
    </main>
  )
}
