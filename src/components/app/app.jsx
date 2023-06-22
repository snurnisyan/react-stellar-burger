import React, {useEffect} from 'react';
import styles from "./app.module.css";
import AppHeader from './../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch, useSelector} from 'react-redux';
import {getData} from "../../services/actions/burger-ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export default function App() {
  const { loading, error } = useSelector(store => ({
    loading: store.ingredientsData.loading,
    error: store.ingredientsData.error
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData())
  }, [dispatch]);

  if (error) {
    return <p>Произошла ошибка при получении данных</p>
  } else if (loading) {
    return <p>Загрузка...</p>
  } else {
    return (
      <>
        <AppHeader/>
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </>
    );
  }
}
