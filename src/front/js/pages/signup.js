import React, { useContext, useState } from "react"
import { Params, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { store, actions } = useContext(Context);
	const params = useParams();

    const [ inputVal, setInputVal ] = useState([])

    const updateInput = e => {
        setInputVal({
            ...inputVal,
            [e.target.className]: e.target.value
        })
    }

    const handleSubmit = e => {
        const signupURL = "https://3001-romanconsta-authenticat-1ca57ct7maq.ws-eu90.gitpod.io/api/signup"
        const submitNewUser = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ "email": inputVal.email, "password": inputVal.password })
        };
        fetch(signupURL, submitNewUser)
    }
        
    return (
        <>
        <h1>Sign Up</h1>
        <h6>Already signed up? Log in <Link to="/login">here</Link></h6>
        <form name="signup" onSubmit={handleSubmit}>
            <label> Email:
                <input className="email" onChange={updateInput}></input>
            </label>
            <label> Password:
                <input className="password" onChange={updateInput}></input>
            </label>
            <button type="submit">Sign up</button>
        </form>
        </>
    );
}