import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "../components/Layout";
import HomePage from "../pages/Homepage";
import Users from "../pages/Users";
import Activities from "../pages/Activities";

const AppRoutes = () => {
    return (
        <Fragment>
            <Switch>
                {/* <Route exact path="/" component={Login} /> */}
                <Layout>
                    <Route path="/" component={HomePage} />
                    <Route path="/users" component={Users} />
                    <Route path="/activities" component={Activities} />
                </Layout>
            </Switch>
        </Fragment>
    );
};

export default AppRoutes;
