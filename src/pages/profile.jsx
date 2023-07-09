import React, {useEffect, useRef, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form.module.css';
import ProfileNav from "../components/profile-nav/profile-nav";
import {useDispatch, useSelector} from "react-redux";
import {patchUser} from "../services/actions/profile";

export default function ProfilePage() {
  const classNames = {
    wrapper: styles.wrapper,
    header: styles.text + ' text text_type_main-medium pb-6',
    form: styles.form,
    input: 'pb-6',
    button: styles.button + ' mb-20',
    text: styles.text + ' text text_type_main-default text_color_inactive',
    link: styles.link,
    section: styles.section,
  }

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const dispatch = useDispatch();

  const {user, password} = useSelector(store => ({
    user: store.authData.user,
    password: store.authData.user.password
  }));

  useEffect(() => {
    setValue({ name: user.name || '', email: user.email || '', password: password || '' });
  }, [user, password]);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUser({ email: form.email, name: form.name, password }));
  };
  const onIconClick = (ref) => {
    setTimeout(() => ref.current.focus(), 0);
  }

  const [initialState, setInitialState] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    if (Object.values(initialState).every((value) => !value)) {
      setInitialState({...form});
    }
  }, [form]);
  const onChange = e => {
    const newForm = {...form, [e.target.name]: e.target.value };
    setValue(newForm);
    if (!(newForm.email === initialState.email && newForm.name === initialState.name && newForm.password === initialState.password)) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  return (
    <section className={classNames.section}>
      <ProfileNav />
      <div className={classNames.wrapper}>
        <form className={classNames.form} onSubmit={onSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            value={form.name}
            name={'name'}
            icon={'EditIcon'}
            ref={nameRef}
            onIconClick={() => onIconClick(nameRef)}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={classNames.input}
          />
          <Input
            type={'email'}
            placeholder="E-mail"
            onChange={onChange}
            value={form.email}
            name={'email'}
            icon={'EditIcon'}
            ref={emailRef}
            onIconClick={() => onIconClick(emailRef)}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={classNames.input}
          />
          <Input
            type={'password'}
            placeholder="Пароль"
            onChange={onChange}
            value={form.password}
            name={'password'}
            icon={'EditIcon'}
            ref={passwordRef}
            onIconClick={() => onIconClick(passwordRef)}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={classNames.input}
          />
          {isChanged && (
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          )}
        </form>
      </div>
    </section>
  );
}
