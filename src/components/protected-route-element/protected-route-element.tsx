import {Navigate} from 'react-router-dom';
import React, {ReactElement} from 'react';
import {isUserAuthorized} from "../../utils/utils";
import {useSelector} from "../../services/hooks/useSelector";

type TProtectedRouteElementProps = {
  element: ReactElement;
  redirect: string;
}

export const ProtectedRouteElement = ({ element, redirect }: TProtectedRouteElementProps): ReactElement => {
  const { user } = useSelector((store) => ({
    user: store.authData.user
  }));

  return isUserAuthorized(user) ? element : <Navigate to={redirect}/>;
}

