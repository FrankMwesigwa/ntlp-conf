import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "../components/Layout";
import HomePage from "../pages/Homepage";
import Users from "../pages/Users";
import Activities from "../pages/Activities";
import Registration from "../pages/Registration";

const AppRoutes = () => {
    return (
        <Fragment>
            <Layout>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/activities" component={Activities} />
                    <Route exact path="/registration" component={Registration} />
                </Switch>
            </Layout>
        </Fragment>
    );
};

export default AppRoutes;
