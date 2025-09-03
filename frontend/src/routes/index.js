import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout";
import HomePage from "../pages/Homepage";
import Users from "../pages/Users";
import Activities from "../pages/Activities";
import Registration from "../pages/Registration";
import { 
    AdminDashboard, 
    AdminRegistrations, 
    AdminAbstracts, 
    AdminPayments 
} from "../pages/Admin";

const AppRoutes = () => {
    return (
        <Fragment>
            <Switch>
                {/* Admin Routes */}
                <Route path="/admin">
                    <AdminLayout>
                        <Switch>
                            <Route exact path="/admin" component={AdminDashboard} />
                            <Route exact path="/admin/registrations" component={AdminRegistrations} />
                            <Route exact path="/admin/abstracts" component={AdminAbstracts} />
                            <Route exact path="/admin/payments" component={AdminPayments} />
                        </Switch>
                    </AdminLayout>
                </Route>
                
                {/* Public Routes */}
                <Layout>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/users" component={Users} />
                        <Route exact path="/activities" component={Activities} />
                        <Route exact path="/registration" component={Registration} />
                    </Switch>
                </Layout>
            </Switch>
        </Fragment>
    );
};

export default AppRoutes;
