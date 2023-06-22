import React from "react";
import styles from "../order-details/order-details.module.css";
import Modal from "../modal/modal";
import orderConfirmSvg from '../../images/order-confirm.svg'
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export default function OrderDetails({ opened, onModalClose }) {

  const classNames = {
    orderContainer: styles.order,
    orderNumber: styles.order__number + " text text_type_digits-large pt-4 pb-8",
    orderTextId: "text text_type_main-medium",
    orderImg: "pt-15 pb-20",
    orderText: "text text_type_main-default",
    orderTextPurple: "text text_type_main-default text_color_inactive pt-2 pb-15"
  }
  const {order, error} = useSelector(store => ({
    order: store.orderDetails.order,
    error: store.orderDetails.error
  }));

  return (
    <Modal opened={opened} onModalClose={onModalClose}>
      <div className={classNames.orderContainer}>
        {error ? (
          <h3 className={classNames.orderTextId}>Произошла ошибка при оформлении заказа :(</h3>
        ) : (
          <>
            <p className={classNames.orderNumber}>{order.number}</p>
            <h3 className={classNames.orderTextId}>идентификатор заказа</h3>
            <img className={classNames.orderImg} src={orderConfirmSvg} alt='заказ подтвержден'/>
            <p className={classNames.orderText}>Ваш заказ начали готовить</p>
            <p className={classNames.orderTextPurple}>Дождитесь готовности на орбитальной станции</p>
          </>
        )}
      </div>
    </Modal>
  )
}

OrderDetails.propTypes = {
  opened: PropTypes.bool.isRequired,
  header: PropTypes.string,
  onModalClose: PropTypes.func.isRequired
}
