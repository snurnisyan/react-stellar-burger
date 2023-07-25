import React, {ReactElement, useEffect, useState} from "react";
import {IClassNames} from "../utils/types";
import ProfileNav from "../components/profile-nav/profile-nav";
import styles from "./profile-orders.module.css"
import ScrollableFeedComponent from "../components/scrollable-feed/scrollable-feed";
import {useDispatch} from "../services/hooks/useDispatch";
import {WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_START,} from "../services/actions/wsActions";
import {useSelector} from "../services/hooks/useSelector";

type TProfileOrdersPageProps = {
  modalPath: string;
}

export default function ProfileOrdersPage({modalPath}: TProfileOrdersPageProps): ReactElement {
  const classNames: IClassNames = {
    section: styles.section,
    wrapper: styles.wrapper + " pt-10"
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_AUTH_CONNECTION_START });
    return () => {dispatch({ type: WS_AUTH_CONNECTION_CLOSED })};
  }, [dispatch]);

  const { userOrders } = useSelector(store => ({
    userOrders: store.wsData.userOrders,
  }));

  return (
    <section className={classNames.section}>
      <ProfileNav />
      <div className={classNames.wrapper}>
        <ScrollableFeedComponent status={true} orders={userOrders} modalPath={modalPath}/>
      </div>
    </section>
  );
}
