import React, {ReactElement, useMemo} from "react";
import styles from "./order-card.module.css";
import {IClassNames} from "../../utils/types";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImageComponent from "../ingredient-image/ingredient-image";
import {IWSOrder} from "../../services/types";
import {useSelector} from "../../services/hooks/useSelector";
import {Link, useLocation} from "react-router-dom";

type TOrderCardComponentProps = {
  status?: boolean;
  order: IWSOrder;
  handleOrderClick: (key: string) => void;
  modalPath: string;
}
export default function OrderCardComponent({status, order, handleOrderClick, modalPath}: TOrderCardComponentProps): ReactElement {
  const classNames: IClassNames = {
    orderMainContainer: styles.order + " p-6 mb-6",
    orderID: styles.order__id,
    numberText: "text text_type_digits-default",
    dateText: "text text_type_main-default text_color_inactive",
    burgerName: "text text_type_main-medium pt-6",
    imageAndPriceContainer: styles.image_price__container + " pt-6",
    statusText: "text text_type_main-default mt-2",
    imagesContainer: styles.img__container,
    priceContainer: styles.price__container,
  }

  const { ingredients, orders } = useSelector(store => ({
    ingredients: store.ingredientsData.ingredients,
    orders: store.wsData.orders,
  }));
  const location = useLocation();
  const maxIngredients: number = 6;

  const orderedIngredients = useMemo(() => {
    return order.ingredients.map((id: string) => {
      return ingredients.find(item => item._id === id);
    })
  }, [orders]);

  const displayedIngredients = useMemo(() => {
    return orderedIngredients.slice(0, maxIngredients);
  }, [orderedIngredients]);

  const displayedCounter = useMemo(() => {
    return orderedIngredients.length - displayedIngredients.length;
  }, [orderedIngredients, displayedIngredients]);

  const orderSum = useMemo(() => {
    return orderedIngredients.reduce((total, ingredient) => {
      if (!ingredient) return total;
      return total + ingredient.price;
    }, 0);
  }, [orderedIngredients]);

  let orderStatus = '';
  const statusTextColor = {
    color: '#FFF',
  }
  if (order.status === 'done') {
    orderStatus = 'Выполнен';
    statusTextColor.color = '#00CCCC';
  }

  if (order.status === 'pending') {
    orderStatus = 'Готовится';
  }

  if (order.status === 'created') {
    orderStatus = 'Создан';
  }

  return (
    <Link to={`${modalPath}/${order._id}`} state={{ orderBackground: location }} style={{ textDecoration: 'none', color: 'white'}}>
      <div className={classNames.orderMainContainer} onClick={() => { handleOrderClick(order._id) }}>
        <div className={classNames.orderID}>
          <p className={classNames.numberText}>#{order.number}</p>
          <p className={classNames.dateText}><FormattedDate date={new Date(order.updatedAt)} /></p>
        </div>
        <h3 className={classNames.burgerName}>{order.name}</h3>
        {status && (
          <p className={classNames.statusText} style={statusTextColor}>{orderStatus}</p>
        )}
        <div className={classNames.imageAndPriceContainer}>
          <div className={classNames.imagesContainer}>
            {displayedIngredients.map((ingredient, index) => (
              ingredient && <IngredientImageComponent
                key={index}
                ingredient={ingredient}
                index={index}
                lastElement={index === maxIngredients - 1}
                counter={displayedCounter}
              />
            ))}
          </div>
          <div className={classNames.priceContainer}>
            <p className={classNames.numberText + " pl-6 pr-2"}>{orderSum}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  )
}
