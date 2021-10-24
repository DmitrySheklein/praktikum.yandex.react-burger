import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../services/auth/selectors";
import Preloader from "./preloader/preloader";

const ProtectedRouter = ({ children, path, isAuthChecking, exact = false }) => {
  const user = useSelector(getUser);

  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        isAuthChecking ? (
          <Preloader />
        ) : user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRouter;
