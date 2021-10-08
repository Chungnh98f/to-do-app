import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AntSuspense from "../../components/UI/AntSuspense";
import { TodoStateProvider } from "../../store/context/todo";

const TodoComponent = lazy(() => import("../../components/Management/Todo"));

function Todo() {
    return (
        <>
            <TodoStateProvider>
                <Switch>
                    <Route exact path="/todo-management">
                        <AntSuspense>
                            <TodoComponent />
                        </AntSuspense>
                    </Route>
                    <Redirect to="/404" />
                </Switch>
            </TodoStateProvider>
        </>
    );
}

export default Todo;
