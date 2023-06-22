import {urlName} from "../../utils/constans";

export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_LOADING = 'DATA_LOADING';
export const DATA_FAILED = 'DATA_LOADED';

export function getData() {
  return function (dispatch) {
    dispatch({
      type: DATA_LOADING
    })
    fetch(`${urlName}/ingredients`)
      .then(res => {
        if (res && res.ok) {
          return res.json();
        } else {
          throw new Error(`Ошибка: ${res.status} - ${res.statusText}`);
        }
      })
      .then(resJson => {
        dispatch({
          type: DATA_SUCCESS,
          ingredients: resJson.data
        })
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: DATA_FAILED
        })
      })
  }
}


