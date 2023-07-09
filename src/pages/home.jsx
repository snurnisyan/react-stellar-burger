import React from 'react';
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "./home.module.css";
import {useSelector} from "react-redux";


export default function HomePage() {

  const { loading, error } = useSelector(store => ({
    loading: store.ingredientsData.loading,
    error: store.ingredientsData.error
  }));

  if (error) {
    return <p className={"text text_type_main-medium"}>Произошла ошибка при получении данных</p>
  } else if (loading) {
    return <p className={"text text_type_main-medium"}>Загрузка...</p>
  } else {
    return (
      <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
      </main>
    );
  }
}
