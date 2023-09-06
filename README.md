<h1 align="center" style="color: #7B68EE">Stellar Burgers</h1>

Проект представляет собой одностраничный сайт космической бургерной, на которой можно собрать бургер из ингредиентов и сделать заказ.

Проект создан в процессе обучения на Яндекс Практикуме.

Готовый проект можно посмотреть по *<a style="color: #7B68EE" href="https://syan-burgers.students.nomoreparties.co/">ссылке</a>*.

![Stellar-burgers](https://github.com/snurnisyan/react-stellar-burger/assets/127420427/8d30036f-6fda-44b9-92ee-bcdc9515d0f3)

------

<h3 align="center" style="color: #7B68EE">Реализованные страницы</h2>

1. Главная страница (перетаскивание ингредиентов в конструктор, перетакивание ингредиентов внутри конструктора, создание заказа).
2. Авторизация (регистрация, вход, восстановление пароля).
3. Профиль (изменение своих данных, просмотр своих заказов, выход из профиля).
4. Лента заказов (все заказы).
5. Модальные окна (одного ингредиента, номера заказа, деталей заказов).



------

<h3 align="center" style="color: #7B68EE">Основные технологии проекта</h2>

1. <span style="color: #7B68EE">HTML и CSS.</span> Соблюдается корректная семантика тегов и продвинутая стилизация, адаптивная верстка для больших экранов.
2. <span style="color: #7B68EE">React (React-router, React-dnd).</span> Компонентная сборка, реализовано открытие и закрытие модальных окон, авторизация, роутинг (в т.ч. с динамическим url), drag-n-drop.
3. <span style="color: #7B68EE">Redux (Thunk).</span> Используется хранилище Redux для хранения данных с API и работы с глобальным контекстом.
4. <span style="color: #7B68EE">Typescript.</span> Весь код протипизован, в т.ч. и Redux хранилище.
5. <span style="color: #7B68EE">Jest, Cypress.</span> Основная бизнес-логика (Redux) протестирована с помощью юнит-тестов Jest, главная страница протестирована с помощью функциональных тестов Cypress.
6. <span style="color: #7B68EE">WebSocket.</span> Лента заказов обновляется по сокету.
7. <span style="color: #7B68EE">JWT Tokens.</span> Работа с токенами: авторизация, сохранение токена в cookies и его удаление.
7. <span style="color: #7B68EE">Деплой.</span> Реализован с помощью виртуальной машины Яндекс Облака, настройки nginx и SSL.

------
<h3 align="center" style="color: #7B68EE">Запуск проекта</h2>

Проект создан с помощью *<a style="color: #7B68EE" href="https://github.com/facebook/create-react-app">Create React App</a>*

Проект запускается локально по адресу <a style="color: #7B68EE" href="http://localhost:3000/">localhost:3000</a> путем клонирования данного репозитория и последовательного запуска команд в терминале.

Предварительно должны быть установлены программы Git, NodeJS и менеджер пакетов npm.


```
// clone repo
git clone https://github.com/snurnisyan/react-stellar-burger

// go to dir
cd react-stellar-burger

// install dependencies
npm install

// build project
npm run build

// run dev mode
npm run dev

// run prod mode
npm run start

// run tests (Jest)
npm run test

// run tests in Cypress
npm run cypress

```

------

<h3 align="center" style="color: #7B68EE">Планы по доработке</h2>
* Улучшить адаптивную верстку (для маленьких экранов)
* Добавить экраны загрузки
------

<h3 align="center" style="color: #7B68EE">Контакты</h2>

Если вы заметили какой-то баг или просто хотите поделиться мыслями по поводу этого (и не только) проекта,
можете написать мне сюда:
* Telegram: <span style="color: #7B68EE">@snurnisyan</span>
* Email: <span style="color: #7B68EE">snurnisyan@gmail.com</span>






