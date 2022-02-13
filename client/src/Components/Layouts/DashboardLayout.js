import React from "react";
import { Route } from "react-router-dom";





const DashboardLayout = ({ children, title, }) => {



    return (

        <div>
            <div className='container'>
                <header>
                    <h1>Good day, Kwabena</h1>
                    <p> Here's you image repository</p>
                </header>
                <div>My Images</div>
                <div>Public Repo</div>
                <div></div>
                <h3>{title}</h3>
                {children}
            </div>
        </div>
    );
}

const DashboardLayoutRoute = ({ component: Component, title, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <DashboardLayout title={title}>
                    <Component {...props} />
                </DashboardLayout>
            )}
        />
    );
}

export default DashboardLayoutRoute