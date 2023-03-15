import React, { useContext, useState } from "react";
import { Params, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  
  const params = useParams();

  const [inputVal, setInputVal] = useState([]);

  const updateInput = (e) => {
    setInputVal({
      ...inputVal,
      [e.target.className]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputVal);

    const loginURL =
      "https://3001-romanconsta-authenticat-1ca57ct7maq.ws-eu90.gitpod.io/api/login";
    const loginUser = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputVal.email,
        password: inputVal.password,
      }),
    };

    const loginResponse = await fetch(loginURL, loginUser).catch(() => false);

    if (!loginResponse || !loginResponse.ok)
      return window.alert("User not found");

    const loginJson = await loginResponse.json();

    window.localStorage.setItem("token", loginJson.token);
  };

  return (
    <>
      <h1>Login</h1>
      <h6>
        Need to sign up? Click <Link to="/signup">here</Link>
      </h6>
      <form name="login" onSubmit={handleSubmit}>
        <label>
          {" "}
          Email:
          <input className="email" onChange={updateInput}></input>
        </label>
        <label>
          {" "}
          Password:
          <input className="password" onChange={updateInput}></input>
        </label>
        <button type="submit">Log in</button>
      </form>
    </>
  );
};
