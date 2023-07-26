import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState} from 'react';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import {useNavigate} from 'react-router-dom';
import {postLogin} from "../services/actions/login";
import {isUserAuthorized} from "../utils/utils";
import {IClassNames} from "../utils/types";
import {useDispatch} from "../services/hooks/useDispatch";
import {useSelector} from "../services/hooks/useSelector";

interface IFormValue {
  email: string;
  password: string;
}

export default function LoginPage(): ReactElement {
  const classNames: IClassNames = {
    wrapper: styles.wrapper,
    header: styles.text + ' text text_type_main-medium pb-6',
    form: styles.form,
    input: 'pb-6',
    button: styles.button + ' mb-20',
    text: styles.text + ' text text_type_main-default text_color_inactive',
    link: styles.link
  }

  const [form, setValue] = useState<IFormValue>({ email: '', password: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {accessToken, refreshToken, user} = useSelector((store) => ({
    accessToken: store.authData.accessToken,
    refreshToken: store.authData.refreshToken,
    user: store.authData.user
  }));

  useEffect(() => {
    if (isUserAuthorized(user)) {
      navigate(-1);
    }
  }, [user, navigate, accessToken, refreshToken]);


  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(postLogin(form.email, form.password));
    navigate(-1);
  };

  const onRegisterClick = (): void => {
    navigate('/register');
  };
  const onForgotPasswordClick = (): void => {
    navigate('/forgot-password');
  };

  return (
    <div className={classNames.wrapper}>
      <form className={classNames.form} onSubmit={onSubmit}>
        <h2 className={classNames.header}>Вход</h2>
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
          Войти
        </Button>
      </form>
      <p className={classNames.text + ' pb-4'}>Вы - новый пользователь?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={classNames.link}
          onClick={onRegisterClick}
        >
          Зарегистрироваться
        </Button>
      </p>
      <p className={classNames.text}>Забыли пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass={classNames.link}
          onClick={onForgotPasswordClick}
        >
          Восстановить пароль
        </Button>
      </p>
    </div>
  );
}
