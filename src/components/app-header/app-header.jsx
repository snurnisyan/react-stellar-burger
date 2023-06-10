import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./app-header.module.css";


export default function AppHeader() {
  const classNames = {
    header: styles.header,
    headerContainer: styles.header__container + " pb-4 pt-4",
    nav: styles.nav,
    navElement: styles.element + " text text_type_main-default pl-5 pr-5 pt-4 pb-4",
    navElementInactive: " text_color_inactive",
    logo: styles.logo + " pt-4 pb-4"
  }
  return (
    <header className={classNames.header}>
      <div className={classNames.logo}>
        <Logo />
      </div>
      <div className={classNames.headerContainer}>
        <nav className={classNames.nav}>
          <div className={classNames.navElement + " mr-2"} >
            <BurgerIcon type="primary" />
            Конструктор
          </div>
          <div className={classNames.navElement + classNames.navElementInactive}>
            <ListIcon type="secondary" />
            Лента заказов
          </div>
        </nav>
        <div className={classNames.navElement + classNames.navElementInactive}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </div>
      </div>
    </header>
  );
}
