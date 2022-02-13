import React from "react";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";
import InitialLayout from "./InitialLayout";


const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    let userToken = Cookies.get("accessToken");
    return (
        <>
            <Route {...rest}
                render={
                    (props) => userToken ? <Component {...props} /> : <InitialLayout />
                }
            />

        </>);
};
export default PrivateRoute;
