import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./app-header.module.css";
import {Link, NavLink} from "react-router-dom";
import React, {ReactElement} from 'react';
import {IClassNames} from "../../utils/types";


export default function AppHeader(): ReactElement {

  const classNames: IClassNames = {
    header: styles.header,
    headerContainer: styles.header__container + " pb-4 pt-4",
    nav: styles.nav,
    navElement: styles.element + " text text_type_main-default text_color_inactive pl-5 pr-5 pt-4 pb-4",
    navElementActive: styles.element_active,
    logo: styles.logo + " pt-4 pb-4"
  }
  return (
    <header className={classNames.header}>
      <div className={classNames.logo}>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <div className={classNames.headerContainer}>
        <nav className={classNames.nav}>
          <NavLink
            to='/'
            className={({isActive}) =>
              classNames.navElement + " mr-2 " + (isActive ? classNames.navElementActive : "")
            }
          >
            <BurgerIcon type="primary" />
            Конструктор
          </NavLink>
          <NavLink
            to='/feed'
            className={({isActive}) =>
              classNames.navElement + " " + (isActive ? classNames.navElementActive : "")
            }
          >
            <ListIcon type="secondary" />
            Лента заказов
          </NavLink>
        </nav>
        <NavLink
          to='/profile'
          className={({isActive}) =>
            classNames.navElement + " " + (isActive ? classNames.navElementActive : "")
          }
        >
          <ProfileIcon type="secondary" />
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}
