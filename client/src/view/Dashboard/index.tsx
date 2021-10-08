import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AntSuspense from "../../components/UI/AntSuspense";
import { TodoStateProvider } from "../../store/context/todo";
import { TypeStateProvider } from "../../store/context/type";

const DashboardComponent = lazy(() => import("../../components/Dashboard"));

function Dashboard() {
    return (
        <TodoStateProvider>
            <TypeStateProvider>
                <Switch>
                    <Route exact path="/dashboard">
                        <AntSuspense>
                            <DashboardComponent />
                        </AntSuspense>
                    </Route>

                    <Route exact path="/">
                        <Redirect to="/dashboard" />
                    </Route>

                    <Redirect to="/404" />
                </Switch>
            </TypeStateProvider>
        </TodoStateProvider>
    );
}

export default Dashboard;
