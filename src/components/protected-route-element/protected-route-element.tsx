import {Navigate} from 'react-router-dom';
import React, {ReactElement} from 'react';
import {useSelector} from "react-redux";
import {isUserAuthorized} from "../../utils/utils";
import {IUser} from "../../utils/types";

type TProtectedRouteElementProps = {
  element: ReactElement;
  redirect: string;
}

export const ProtectedRouteElement = ({ element, redirect }: TProtectedRouteElementProps): ReactElement => {
  const { user }: {user: IUser} = useSelector((store: any) => ({
    user: store.authData.user
  }));

  return isUserAuthorized(user) ? element : <Navigate to={redirect}/>;
}

