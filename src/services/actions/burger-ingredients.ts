import {urlName} from "../../utils/constans";
import {checkResponse} from "../../utils/utils";
import {ActionDispatch, AppThunk, TIngredients} from "../types";


export const DATA_SUCCESS: 'DATA_SUCCESS' = 'DATA_SUCCESS';
export const DATA_LOADING: 'DATA_LOADING' = 'DATA_LOADING';
export const DATA_FAILED: 'DATA_LOADED' = 'DATA_LOADED';

interface IDataLoadingAction {
  readonly type: typeof DATA_LOADING;
}

interface IDataSuccessAction {
  readonly type: typeof DATA_SUCCESS;

  readonly ingredients: TIngredients;
}

interface IDataFailedAction {
  readonly type: typeof DATA_FAILED;
}

export type TBurgerIngredientsActions = IDataLoadingAction | IDataSuccessAction | IDataFailedAction;

export const getData: AppThunk = () => {
  return function (dispatch: ActionDispatch) {
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


