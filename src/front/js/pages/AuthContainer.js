import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./useUserAuth";

const getToken = () => {
  return window.localStorage.getItem("token");
};

export const AuthContainer = ({ children }) => {
  const navigate = useNavigate();

  const token = useMemo(() => getToken(), []);
  const { user, loading } = useUserAuth(token);

  if (!user && loading) return <h1>... loading</h1>;

  if (!user && !loading) navigate("/login");

  return children;
};
