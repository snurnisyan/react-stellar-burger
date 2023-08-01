const urlName: string = 'https://norma.nomoreparties.space/api';
const modalRoot: HTMLElement | null = document.getElementById("modal-root");

const tabBunsValue: string = 'buns';
const tabSaucesValue: string = 'sauces';
const tabFillingsValue: string = 'fillings';
const wsUrl: string = 'wss://norma.nomoreparties.space/orders';

const testUser = {
  name: "Test Name",
  email: "test@test.ru",
  password: "Test1234"
}
const testSelectors = {
  ingredient: 'div[class*=ingredient__]',
  tab: 'div[class^=tab]',
  counter: 'div[class*=counter]',
  constructor: 'section[class*=constructor]',
  constructorElement: 'div[class^=constructor-element]'
}

export { urlName, modalRoot, tabBunsValue, tabSaucesValue, tabFillingsValue, wsUrl, testUser, testSelectors }
