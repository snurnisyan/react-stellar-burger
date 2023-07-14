import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState} from 'react';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import {Navigate, useNavigate} from 'react-router-dom';
import {postEmailCheck} from "../services/actions/forgot-password";
import {useDispatch, useSelector} from "react-redux";
import {isUserAuthorized} from "../utils/utils";
import {IClassNames, IUser} from "../utils/types";

interface IFormValue {
  email: string;
}
export default function ForgotPasswordPage(): ReactElement {
  const classNames: IClassNames = {
    wrapper: styles.wrapper,
    header: styles.text + ' text text_type_main-medium pb-6',
    form: styles.form,
    input: 'pb-6',
    button: styles.button + ' mb-20',
    text: styles.text + ' text text_type_main-default text_color_inactive',
    link: styles.link
  }

  const [form, setValue] = useState<IFormValue>({ email: '' });
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {success, user}: {success: boolean, user: IUser} = useSelector((store: any) => ({
    success: store.forgotPassword.success,
    user: store.authData.user
  }));

  useEffect(() => {
    if (success) {
      navigate('/reset-password', { state: 'previousPageVisited' });
    }
  }, [success, navigate])
  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(postEmailCheck(form.email));
  };

  const onLoginClick = (): void => {
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
        <h2 className={classNames.header}>Восстановление пароля</h2>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass={classNames.input}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={classNames.button}
        >
          Восстановить
        </Button>
      </form>
      <p className={classNames.text + ' pb-4'}>Вспомнили пароль?
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
