import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import {useNavigate} from 'react-router-dom';
import {postRegister} from "../services/actions/register";
import {isUserAuthorized} from "../utils/utils";
import {IClassNames} from "../utils/types";
import {useSelector} from "../services/hooks/useSelector";
import {useDispatch} from "../services/hooks/useDispatch";
import {AppThunkDispatch} from "../services/types";

interface IFormValue {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage(): ReactElement {
  const classNames: IClassNames = {
    wrapper: styles.wrapper,
    header: styles.text + ' text text_type_main-medium pb-6',
    form: styles.form,
    input: 'pb-6',
    button: styles.button + ' mb-20',
    text: styles.text + ' text text_type_main-default text_color_inactive',
    link: styles.link
  }

  const [form, setValue] = useState<IFormValue>({ name: '', email: '', password: '' });
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const {accessToken, refreshToken, user} = useSelector((store) => ({
    accessToken: store.authData.accessToken,
    refreshToken: store.authData.refreshToken,
    user: store.authData.user
  }));
  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();

  useEffect(() => {
    if (isUserAuthorized(user)) {
      navigate(-1);
    }
  }, [user, navigate, accessToken, refreshToken]);
  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(postRegister(form.email, form.password, form.name));
  };

  const onLoginClick = (): void => {
    navigate('/login');
  };

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
