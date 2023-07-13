import React from 'react';
import styles from './not-found.module.css';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import image from "../images/not-found.png";

export default function NotFound404() {
  const classNames = {
    container: styles.container,
    header: "text text_type_main-large pb-5",
    text: "text text_type_main-medium text_color_inactive pb-5",
    img: styles.img + " mb-10 mt-5",
    button: "mt-10"
  }

  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <div className={classNames.container}>
      <h1 className={classNames.header}>Упс! Ошибка 404</h1>
      <img src={image} className={classNames.img} alt="ошибка"></img>
      <p className={classNames.text}>Похоже, вы дошли до края вселенной</p>
      <p className={classNames.text}>Страница, которую вы запрашиваете, не существует :(</p>
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={onClick}
        extraClass={classNames.button}
      >
        Вернуться в конструктор
      </Button>
    </div>
  );
}
