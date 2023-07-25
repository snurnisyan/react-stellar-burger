import React, {ReactElement, useMemo} from "react";
import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderButton from "../order-button/order-button";
import {useDrop} from "react-dnd";
import {ADD_INGREDIENT, REPLACE_BUN} from "../../services/actions/burger-constructor";
import DraggableConstructorElement from "../draggable-constructor-element/draggable-constructor-element";
import {v4 as uuidv4} from 'uuid';
import {IClassNames} from "../../utils/types";
import {IIngredient} from "../../services/types";
import {useSelector} from "../../services/hooks/useSelector";
import {useDispatch} from "../../services/hooks/useDispatch";


export default function BurgerConstructor(): ReactElement {
  const classNames: IClassNames = {
    constructorSection: styles.section + " pt-25 pl-4 pr-2",
    bunElement: "ml-8 mb-4 mr-2",
    priceContainer: styles.price__container,
    scrollbarContainer: styles.scrollbar__container,
    constructorElement: styles.constructor__element + " ml-1",
    dragContainer: styles.drag__container + " mb-4 pr-2",
    messageHeader: styles.message__header + " text text_type_main-medium text_color_inactive pb-4"
  }
  const { chosenIngredients } = useSelector((store) => ({
    chosenIngredients: store.chosenIngredients.chosenIngredients
  }));
  const dispatch = useDispatch();

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: IIngredient) {
      if (ingredient.type === 'bun') {
        dispatch({
          type: REPLACE_BUN,
          ingredient: ingredient
        })
        return;
      }
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: {...ingredient, uuid: uuidv4()}
      })
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const totalPrice = useMemo(() => {
    return chosenIngredients.reduce((total: number, ingredient: IIngredient) => {
      if (ingredient.type === "bun") {
        total = total + (ingredient.price * 2);
      } else {
        total = total + ingredient.price;
      }
      return total;
    }, 0);
  }, [chosenIngredients]);

  const bun = useMemo(() => {
    return chosenIngredients.find((element: IIngredient) => {
      return element.type === "bun";
    });
  }, [chosenIngredients]);

  const fillings = useMemo(() => {
    return chosenIngredients.filter((element: IIngredient) => {
      return element.type !== "bun";
    });
  }, [chosenIngredients]);

  const hasBun = bun !== undefined;

  const messageClass: string = isHover ? styles.message_hover : styles.message;

  return (
    <section className={classNames.constructorSection}>
        <div ref={dropTarget}>
          {hasBun ? (
            <>
              <ConstructorElement
                extraClass={classNames.bunElement}
                type="top"
                isLocked={true}
                text={bun.name + " (верх)"}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
              <div className={classNames.scrollbarContainer}>
                {fillings.map((filling: IIngredient, index: number) => (
                  <DraggableConstructorElement filling={filling} key={filling.uuid} hoverIndex={index}/>
                ))
                }
              </div>
              <ConstructorElement
                extraClass={classNames.bunElement}
                type="bottom"
                isLocked={true}
                text={bun.name + " (низ)"}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            </>
          ) : (
            <>
              <h2 className={classNames.messageHeader}>Пожалуйста, перетащите булку сюда ↓</h2>
              <div className={messageClass}>
              </div>
            </>
          )
          }
        </div>
      <div className={classNames.priceContainer}>
        <p className="text text_type_digits-medium">{totalPrice} <CurrencyIcon type="primary"/></p>
        <OrderButton enabled={hasBun}/>
      </div>
    </section>
  )
}

