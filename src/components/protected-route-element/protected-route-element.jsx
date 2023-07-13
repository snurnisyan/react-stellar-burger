import {Navigate} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import {isUserAuthorized} from "../../utils/utils";

export const ProtectedRouteElement = ({ element, redirect }) => {
  const { user } = useSelector(store => ({
    user: store.authData.user
  }));

  return isUserAuthorized(user) ? element : <Navigate to={redirect}/>;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  redirect: PropTypes.string.isRequired,
}
