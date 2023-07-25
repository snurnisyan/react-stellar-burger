import React, {ReactElement, useEffect, useMemo, useState} from "react";
import {IClassNames, TGroupedArr, TGroupedObj} from "../../utils/types";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImageComponent from "../ingredient-image/ingredient-image";
import styles from "./order-component.module.css";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "../../services/hooks/useSelector";
import {IIngredient, IWSOrder} from "../../services/types";

type TOrderComponentProps = {
  orders: Array<IWSOrder>;
}

export default function OrderComponent({orders}: TOrderComponentProps): ReactElement {
  const classNames: IClassNames = {
    orderContainer: styles.order,
    orderDigits: "text text_type_digits-default pr-2",
    orderMainText: "text text_type_main-medium",
    orderStatus: styles.status + " text text_type_main-default",
    orderSmallText: "text text_type_main-default",
    orderDate: "text text_type_main-default text_color_inactive",
    ingredientContainer: styles.ingredient + " pb-4 pr-8",
    ingredientName: styles.ingredient__name,
    priceContainer: styles.price__container,
    scrollbarContainer: styles.scrollbar__container,
    datePriceContainer: styles.date_price + " pt-10",
    totalPriceContainer: styles.total__price
  }

  const { id } = useParams();
  const location = useLocation();

  const { chosenOrder, ingredients } = useSelector((store) => ({
    chosenOrder: store.chosenOrder.orderInfo,
    ingredients: store.ingredientsData.ingredients,
  }));

  const [order, setOrder] = useState<IWSOrder>({} as IWSOrder);
  useEffect(() => {
    if (orders.length === 0) {
      return;
    }
    if (!location?.state?.orderBackground && id) {
      const found = orders.find(({ _id }) => _id === id);
      if (found) {
        setOrder(found);
      }
    } else {
      setOrder(chosenOrder);
    }
  }, [id, orders, location, setOrder]);

  const allIngredientsInOrder: IIngredient[] = useMemo(() => {
    if (!order.ingredients) return [];
    return order.ingredients.map((ingredientId: string) => {
      return ingredients.find((item: IIngredient) => item._id === ingredientId);
    }).filter((item: IIngredient | undefined) => item !== undefined) as IIngredient[];
  }, [order, ingredients]);

  const groupedIngredientsInOrder = useMemo(() => {
    const group: TGroupedObj = {};
    const ingredientsWithCounter: TGroupedArr = [];
    allIngredientsInOrder.forEach((ingredient: IIngredient) => {
      ingredientsWithCounter.push({...ingredient, counter: 1})
    });
    ingredientsWithCounter.forEach((ingredient) => {
      if (!group[ingredient._id]) {
        group[ingredient._id] = ingredient;
      } else {
        group[ingredient._id].counter += 1;
      }
    })
    return Object.values(group);
  }, [order, allIngredientsInOrder]);

  const orderSum = useMemo(() => {
    return allIngredientsInOrder.reduce((total, ingredient: IIngredient) => {
      if (!ingredient) return total;
      if (ingredient.type === "bun") {
        total = total + (ingredient.price * 2);
      } else {
        total = total + ingredient.price;
      }
      return total;
    }, 0);
  }, [order, allIngredientsInOrder]);

  if (!order || !order.ingredients || order.ingredients.length === 0) {
    return <p className={"text text_type_main-medium"}>Загрузка...</p>
  }

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
    <div className={classNames.orderContainer}>
      <h2 className={classNames.orderMainText + " pt-10 pb-3"}>{order.name}</h2>
      <p className={classNames.orderStatus}>{orderStatus}</p>
      <h3 className={classNames.orderMainText + " pt-15 pb-6"}>Состав:</h3>
      <div className={classNames.scrollbarContainer}>
        {groupedIngredientsInOrder.map((ingredient, index) => {
          if (ingredient) {
            return (
              <div className={classNames.ingredientContainer} key={index}>
                <div className={classNames.ingredientName}>
                  <IngredientImageComponent ingredient={ingredient} index={0}/>
                  <p className={classNames.orderSmallText + " pl-4 pr-4"}>{ingredient.name}</p>
                </div>
                <div className={classNames.priceContainer}>
                  {ingredient.type === 'bun' ? (
                    <p className={classNames.orderDigits}>{2} x</p>
                     ) : ( <p className={classNames.orderDigits}>{ingredient.counter} x</p> )
                  }
                  <p className={classNames.orderDigits}>{ingredient.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            )
          } else {
            return (<></>);
          }
        })}
      </div>
      <div className={classNames.datePriceContainer}>
        <p className={classNames.orderDate}><FormattedDate date={new Date(order.updatedAt)} /></p>
        <div className={classNames.totalPriceContainer}>
          <p className={classNames.orderDigits}>{orderSum}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
