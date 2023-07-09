import React from 'react';
import styles from './profile-nav.module.css';
import {NavLink} from 'react-router-dom';
import {postLogout} from "../../services/actions/logout";
import {useDispatch} from "react-redux";

export default function ProfileNav() {
  const classNames = {
    nav: styles.nav + ' pr-15 pl-5',
    navElement: styles.nav__element + " text text_type_main-medium text_color_inactive pt-4 pb-4",
    navElementActive: styles.nav__element_active,
    navText: styles.nav__text + " text text_type_main-default text_color_inactive pt-20",
    link: styles.link + " text text_type_main-medium text_color_inactive pt-4 pb-4"
  }

  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(postLogout());
  }

  return (
    <div className={classNames.nav}>
      <NavLink
        to='/profile'
        className={({isActive}) =>
          classNames.navElement + " " + (isActive ? classNames.navElementActive : "")
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to='/profile/orders'
        className={({isActive}) =>
          classNames.navElement + " " + (isActive ? classNames.navElementActive : "")
        }
      >
        История заказов
      </NavLink>
      <a href="#" className={classNames.link} onClick={onLogoutClick}>
        Выход
      </a>
      <p className={classNames.navText}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
);
}
