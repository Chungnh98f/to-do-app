import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AntSuspense from "../../components/UI/AntSuspense";

const User = lazy(() => import("../../components/User"));

function Profile() {
    return (
        <Switch>
            <Route exact path="/profile">
                <AntSuspense>
                    <User />
                </AntSuspense>
            </Route>
            <Redirect to="/404" />
        </Switch>
    );
}

export default Profile;
