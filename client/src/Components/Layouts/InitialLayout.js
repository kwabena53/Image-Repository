import 'antd/dist/antd.less';
import React from "react"


import { Switch, Redirect } from "react-router-dom"
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';
import MainLayoutRoute from './MainLayout';
import HomePage from "../../HomePage"



function InitialLayout() {

    return (

        <Switch>
            
            <MainLayoutRoute path="/login" component={Login} />
            <MainLayoutRoute path="/register" component={Register} />
            <MainLayoutRoute path="/public" component={HomePage} />
            <Redirect to="/public" />
        </Switch>

    );
}



export default InitialLayout;