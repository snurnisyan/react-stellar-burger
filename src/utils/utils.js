export function transformArrayToMap({array, keyFunc}) {
  const mapped = {};
  array.forEach((item) => {
    mapped[keyFunc(item)] = item;
  });
  return mapped;
}

export function checkResponse(res) {
  if (res && res.ok) {
    return res.json();
  } else {
    throw new Error(`Ошибка: ${res.status}`);
  }
}

export function checkElementPresence(array, type) {
  return array.some((item) => {
    return item.type === type
  });
}
