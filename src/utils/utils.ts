import {IUser, TIngredients} from "./types";


export class ForbiddenError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export function checkResponse(res: Response) {
  if (res && res.ok) {
    return res.json();
  } else if (res.status === 403) {
    throw new ForbiddenError();
  } else {
    throw new Error(`Ошибка: ${res.status}`);
  }
}

export function checkElementPresence(array: TIngredients, type: string) {
  return array.some((item) => {
    return item.type === type
  });
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string | null, props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  if (typeof value === 'string') {
    value = encodeURIComponent(value);
  }
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export function setTokens(accessToken: string, refreshToken: string) {
  let authToken = accessToken.split(' ')[1];
  setCookie('token', authToken);
  setCookie('refreshToken', refreshToken);
}

export const isEmpty = (obj: Object | undefined) => {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0;
}

export const isUserAuthorized = (user: IUser) => Object.keys(user).length > 0;
