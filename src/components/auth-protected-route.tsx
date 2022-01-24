import React, { FC } from "react";
import { useSelector } from "../types/hooks";
import { getIsAuthChecking, getUser } from "../services/auth/selectors";
import { Redirect, Route, useLocation } from "react-router-dom";
import Preloader from "./preloader/preloader";
import { Location } from "history";

type TLocationState = {
  from: Location;
};
type TAuthProtectedRoute = {
  path: string;
  exact?: boolean;
};
const AuthProtectedRoute: FC<TAuthProtectedRoute> = ({
  children,
  path,
  exact = true,
}) => {
  const location = useLocation<TLocationState>();
  const isAuthChecking = useSelector(getIsAuthChecking);
  const user = useSelector(getUser);
  const { from } = location.state || {
    from: { pathname: "/" },
  };
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
