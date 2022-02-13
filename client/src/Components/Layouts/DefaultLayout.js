import React from "react";

import { Layout } from "antd";
import UserHomePage from "../../Pages/UserHomePage/UserHomePage";
import DashboardLayoutRoute from "./DashboardLayout";
import { Redirect, Switch } from "react-router-dom";


export default function DefaultLayout() {

  // const accountType = useSelector((state) => state?.login?.userType)
  return (
    <Layout>
      <Switch>
        <DashboardLayoutRoute title="home" title="My Repo" exact path="/my-repo" component={UserHomePage} />
        <DashboardLayoutRoute title="home" title="Public Repo" path="/public" component={UserHomePage} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}
