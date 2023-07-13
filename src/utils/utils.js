export function transformArrayToMap({array, keyFunc}) {
  const mapped = {};
  array.forEach((item) => {
    mapped[keyFunc(item)] = item;
  });
  return mapped;
}
export function ForbiddenError(message = "") {
  this.name = "ForbiddenError";
  this.message = message;
}
ForbiddenError.prototype = Error.prototype;

export function checkResponse(res) {
  if (res && res.ok) {
    return res.json();
  } else if (res.status === 403) {
    throw new ForbiddenError();
  } else {
    throw new Error(`Ошибка: ${res.status}`);
  }
}

export function checkElementPresence(array, type) {
  return array.some((item) => {
    return item.type === type
  });
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
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
  value = encodeURIComponent(value);
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

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export function setTokens(accessToken, refreshToken) {
  let authToken = accessToken.split(' ')[1];
  setCookie('token', authToken);
  setCookie('refreshToken', refreshToken);
}

export const isEmpty = (obj) => {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0;
}

export const isUserAuthorized = (user) => Object.keys(user).length > 0;
