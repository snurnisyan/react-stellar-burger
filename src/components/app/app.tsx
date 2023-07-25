import React, {ReactElement, useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import {BrowserRouter} from 'react-router-dom';
import {getUser} from "../../services/actions/profile";
import {getCookie} from "../../utils/utils";
import {getData} from "../../services/actions/burger-ingredients";
import RoutesComponent from "../routes-component/routes-component";
import {useDispatch} from "../../services/hooks/useDispatch";
import {AppThunkDispatch} from "../../services/types";

export default function App(): ReactElement {
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);
  const dispatch: AppThunkDispatch = useDispatch();

  const init = async () => {
    if (getCookie('token')) {
      await dispatch(getUser());
    }
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
    dispatch(getData());
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppHeader/>
        { !isUserLoaded ? (
          <p className={"text text_type_main-medium"}>Загрузка...</p>
        ) : (
          <RoutesComponent />
          )
        }
      </BrowserRouter>
    </>
  );
}
