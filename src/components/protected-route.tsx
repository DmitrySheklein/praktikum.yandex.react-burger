import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "../types/hooks";
import { getIsAuthChecking, getUser } from "../services/auth/selectors";
import Preloader from "./preloader/preloader";

type TProtectedRoute = {
  path: string;
  exact?: boolean;
};
const ProtectedRoute: FC<TProtectedRoute> = ({
  children,
  path,
  exact = false,
}) => {
  const user = useSelector(getUser);
  const isAuthChecking = useSelector(getIsAuthChecking);

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
// ProtectedRoute.propTypes = {
//   path: PropTypes.string.isRequired,
//   children: PropTypes.element.isRequired,
//   exact: PropTypes.bool,
//   isAuthChecking: PropTypes.bool,
// };

export default ProtectedRoute;
