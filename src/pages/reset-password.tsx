import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {postPasswordReset} from "../services/actions/reset-password";
import {isUserAuthorized} from "../utils/utils";
import {IClassNames} from "../utils/types";
import {useDispatch} from "../services/hooks/useDispatch";
import {useSelector} from "../services/hooks/useSelector";
import {AppThunkDispatch} from "../services/types";

interface IFormValue {
  password: string;
  securityCode: string;
}

export default function ResetPasswordPage(): ReactElement {
  const classNames: IClassNames = {
    wrapper: styles.wrapper,
    header: styles.text + ' text text_type_main-medium pb-6',
    form: styles.form,
    input: 'pb-6',
    button: styles.button + ' mb-20',
    text: styles.text + ' text text_type_main-default text_color_inactive',
    link: styles.link
  }

  const [form, setValue] = useState<IFormValue>({ password: '', securityCode: '' });
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch: AppThunkDispatch = useDispatch();
  const location = useLocation();

  const {success, user} = useSelector((store) => ({
    success: store.resetPassword.success,
    user: store.authData.user
  }));

  const onLoginClick = (): void => {
    navigate('/login');
  };

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success, navigate]);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(postPasswordReset(form.password, form.securityCode));
  }

  if (isUserAuthorized(user)) {
    return (
      <Navigate to="/" replace />
    );
  }

  if (location.state !== 'previousPageVisited') {
    return (
      <Navigate to="/forgot-password" replace />
    );
  }

  return (
    <div className={classNames.wrapper}>
      <form className={classNames.form} onSubmit={onSubmit}>
        <h2 className={classNames.header}>Восстановление пароля</h2>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={onChange}
          value={form.password}
          name={'password'}
          extraClass={classNames.input}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={form.securityCode}
          name={'securityCode'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={classNames.input}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={classNames.button}
        >
          Сохранить
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
