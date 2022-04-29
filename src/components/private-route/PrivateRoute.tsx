import React from "react";
import { RouteProps, Outlet, Navigate } from "react-router-dom";
import { routes } from "../../routes";

const PrivateRoute: React.FC<RouteProps> = () => {
  // TODO: check if logged in, if not then redirect. need the JWT PR for that
  if (false) {
    return <Navigate to={routes.signin} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
