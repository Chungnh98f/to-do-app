import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AntSuspense from "../../components/UI/AntSuspense";
import { TypeStateProvider } from "../../store/context/type";

const TypeComponent = lazy(() => import("../../components/Management/Type"));

function Type() {
    return (
        <>
            <TypeStateProvider>
                <Switch>
                    <Route exact path="/type-management">
                        <AntSuspense>
                            <TypeComponent />
                        </AntSuspense>
                    </Route>
                    <Redirect to="/404" />
                </Switch>
            </TypeStateProvider>
        </>
    );
}

export default Type;
