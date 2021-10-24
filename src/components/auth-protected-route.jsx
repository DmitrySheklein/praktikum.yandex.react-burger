import React from "react";
import { useSelector } from "react-redux";
import { getIsAuthChecking, getUser } from "../services/auth/selectors";
import { Redirect, Route, useLocation } from "react-router-dom";
import Preloader from "./preloader/preloader";

const AuthProtectedRoute = ({ children, path, exact = true }) => {
  const location = useLocation();
  const isAuthChecking = useSelector(getIsAuthChecking);
  const user = useSelector(getUser);
  const { from } = location.state || { from: { pathname: "/" } };
  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        isAuthChecking ? (
          <Preloader />
        ) : user ? (
          <Redirect to={from} />
        ) : (
          children
        )
      }
    />
  );
};

export default AuthProtectedRoute;
