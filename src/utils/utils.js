export function transformArrayToMap({array, keyFunc}) {
  const mapped = {};
  array.forEach((item) => {
    mapped[keyFunc(item)] = item;
  });
  return mapped;
}
