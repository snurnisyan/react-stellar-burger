import React, { useEffect, useState } from 'react';
import styles from "./app.module.css";
import AppHeader from './../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {urlName} from "../../utils/constans";



export default function App() {
  const [data, setData] = useState({ ingredients: [] });
  const [counterState, setCounterState] = useState({});

  useEffect (() => {
    const getApp = async() => {
      const res = await fetch (`${urlName}`);
      if (res.ok) {
        const resJson = await res.json();
        setData({ ingredients: resJson.data });
      } else {
        throw new Error(`Ошибка: ${res.status} - ${res.statusText}`);
      }
    }
    getApp()
      .catch(console.error);
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={data.ingredients} counterState={counterState} setCounterState={setCounterState}/>
        <BurgerConstructor ingredients={data.ingredients} ingredientsCounters={counterState}/>
      </main>
    </>
  );
}
