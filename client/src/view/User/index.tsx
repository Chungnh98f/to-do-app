import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AntSuspense from "../../components/UI/AntSuspense";

const UserComponent = lazy(() => import("../../components/Management/User"));

function User() {
    return (
        <>
            <Switch>
                <Route exact path="/user-management">
                    <AntSuspense>
                        <UserComponent />
                    </AntSuspense>
                </Route>
                <Redirect to="/404" />
            </Switch>
        </>
    );
}

export default User;
