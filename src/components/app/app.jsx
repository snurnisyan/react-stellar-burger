import React from 'react';
import styles from "./app.module.css";
import AppHeader from './../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {urlName} from "../../utils/constans";



export default function App() {
  const [state, setState] = React.useState({ ingredients: [] });
  const [counterState, setCounterState] = React.useState({});

  React.useEffect (() => {
    const getApp = async() => {
      const res = await fetch (`${urlName}`);
      const resJson = await res.json();
      setState({ ingredients: resJson.data });
    }
    getApp()
      .catch(console.error);
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={state.ingredients} counterState={counterState} setCounterState={setCounterState}/>
        <BurgerConstructor ingredients={state.ingredients} ingredientsCounters={counterState}/>
      </main>
    </>
  );
}
