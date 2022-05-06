import { TokenSharp } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RouteProps, Outlet, Navigate } from "react-router-dom";
import { acquireToken } from "../../auth/auth-utils";
import { routes } from "../../routes";

const PrivateRoute: React.FC<RouteProps> = () => {
  const [tokens, setTokens] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    acquireToken().then((value) => setTokens(value));
  }, []);

  if (tokens === undefined) {
    return <CircularProgress />;
  }

  if (tokens === null) {
    return <Navigate to={routes.signin} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
