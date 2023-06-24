import {urlName} from "../../utils/constans";
import {checkResponse} from "../../utils/utils";


export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_LOADING = 'DATA_LOADING';
export const DATA_FAILED = 'DATA_LOADED';

export function getData() {
  return function (dispatch) {
    dispatch({
      type: DATA_LOADING
    })
    fetch(`${urlName}/ingredients`)
      .then(checkResponse)
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


