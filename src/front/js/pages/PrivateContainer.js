// Framework realted packages
import React from "react";
import { AuthContainer } from "./AuthContainer";

import { Private } from "./Private";

const logout = (cbk) => {
  window.localStorage.removeItem("token");
  cbk();
};

export const PrivateContiner = () => {
  const logoutUser = () => {
    logout(() => navigate("/login"));
  };

  return (
    <AuthContainer>
      <Private logoutUser={logoutUser} />
    </AuthContainer>
  );
};
