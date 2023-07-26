import React, {ReactElement} from "react";
import styles from "./order-feed.module.css"
import {IClassNames} from "../../utils/types";
import ScrollableFeedComponent from "../scrollable-feed/scrollable-feed";
import {useSelector} from "../../services/hooks/useSelector";

type TOrderFeedComponentProps = {
  modalPath: string;
}

export default function OrderFeedComponent({modalPath}: TOrderFeedComponentProps): ReactElement {
  const classNames: IClassNames = {
    feedSection: styles.feed,
  }

  const { orders } = useSelector(store => ({
    orders: store.wsData.orders,
  }));

  return (
    <section className={classNames.feedSection}>
      <ScrollableFeedComponent modalPath={modalPath} orders={orders}/>
    </section>
  )
}
