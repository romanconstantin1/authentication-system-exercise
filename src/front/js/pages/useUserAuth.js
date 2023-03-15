import React, { useEffect, useState } from "react";

const API_URL =
  "https://3001-romanconsta-authenticat-1ca57ct7maq.ws-eu90.gitpod.io/api/check";

const checkUser = async (token) => {
  const checkResponse = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(() => false);

  if (!checkResponse || !checkResponse.ok) return false;

  return true;
};

export const useUserAuth = (token) => {
  const [state, setState] = useState(() => ({
    user: null,
    loading: true,
  }));

  const checkUserAuth = async () => {
    const isUserLoggedIn = await checkUser(token);

    if (!isUserLoggedIn)
      return setState((prev) => ({ ...prev, loading: false }));

    setState((prev) => ({
      ...prev,
      user: true,
      loading: false,
    }));
  };

  useEffect(() => {
    checkUserAuth();
  }, [token]);

  return state;
};
