import React, { useContext, useState } from "react"
import { Params, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
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
        e.preventDefault()
        console.log(inputVal)
    }

    return (
        <>
        <h1>Login</h1>
        <h6>Still haven't signed up? Click <Link to ="/signup">here</Link></h6>
        <form name="login" onSubmit={handleSubmit}>
            <label> Email:
                <input className="email" onChange={updateInput}></input>
            </label>
            <label> Password:
                <input className="password" onChange={updateInput}></input>
            </label>
            <button type="submit">Log in</button>
        </form>
        </>
    );
}