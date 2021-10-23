import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../services/auth/selectors";

const ProtectedRoute = ({ children, path }) => {
  const user = useSelector(getUser);

  return (
    <Route
      exact
      path={path}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            // Передадим в пропс to не строку, а объект.
            to={{
              // Маршрут, на который произойдёт переадресация
              pathname: "/login",
              // В from сохраним текущий маршрут
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
