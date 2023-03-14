import React, { useContext } from "react"
import { Params, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const { store, actions } = useContext(Context);
	const params = useParams();

    return (
        <h1>this should only be visible after login</h1>
    );
}