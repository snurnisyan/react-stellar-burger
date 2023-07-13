import React, {useEffect, useState} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import {Navigate, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {postRegister} from "../services/actions/register";
import {isUserAuthorized} from "../utils/utils";

export default function RegisterPage() {
  const classNames = {
    wrapper: styles.wrapper,
    header: styles.text + ' text text_type_main-medium pb-6',
    form: styles.form,
    input: 'pb-6',
    button: styles.button + ' mb-20',
    text: styles.text + ' text text_type_main-default text_color_inactive',
    link: styles.link
  }

  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {accessToken, refreshToken, user} = useSelector(store => ({
    accessToken: store.authData.accessToken,
    refreshToken: store.authData.refreshToken,
    user: store.authData.user
  }));

  useEffect(() => {
    if (isUserAuthorized(user)) {
      navigate('/');
    }
  }, [user, navigate, accessToken, refreshToken]);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postRegister(form.email, form.password, form.name));
  };

  const onLoginClick = () => {
    navigate('/login');
  };

  if (isUserAuthorized(user)) {
    return (
      <Navigate to="/" replace />
    );
  }

  return (
    <div className={classNames.wrapper}>
      <form className={classNames.form} onSubmit={onSubmit}>
        <h2 className={classNames.header}>Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={form.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={classNames.input}
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
          extraClass={classNames.input}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          extraClass={classNames.input}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={classNames.button}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className={classNames.text + ' pb-4'}>Уже зарегистрированы?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={classNames.link}
          onClick={onLoginClick}
        >
          Войти
        </Button>
      </p>
    </div>
  );
}
