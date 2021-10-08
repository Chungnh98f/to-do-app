import { message } from "antd";
import { lazy, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { localToken, sessionToken } from "./auth";
import AntSuspense from "./components/UI/AntSuspense";
import Loading from "./components/UI/Loading";
import DashboardLayout from "./layout/Dashboard";
import { GetAuthStateContext } from "./store/context/auth";
import { getAuth, refreshToken } from "./store/middleware/auth";
import NotAuthorized from "./view/NotAuthorized";
import Profile from "./view/Profile";
import Todo from "./view/Todo";
import Type from "./view/Type";
import User from "./view/User";

const Dashboard = lazy(() => import("./view/Dashboard"));
const Auth = lazy(() => import("./view/Auth"));
const NotFound = lazy(() => import("./view/NotFound"));

function AppRouter() {
    let _sessionToken = sessionToken.getToken();

    const { authState, dispatch } = GetAuthStateContext();
    const [loading, setLoading] = useState<boolean | undefined>(true);

    const checkAuth = (Component: JSX.Element): JSX.Element => {
        const _sessionToken = sessionToken.getToken();
        if (!authState.accessToken && !_sessionToken) {
            return <Redirect to="/auth" />;
        }
        return (
            <DashboardLayout>
                <AntSuspense>{Component}</AntSuspense>
            </DashboardLayout>
        );
    };

    const checkAdmin = (Component: JSX.Element): JSX.Element => {
        if (!authState.accessToken && !_sessionToken) {
            return <Redirect to="/auth" />;
        }

        if (!authState.me?.is_admin) {
            return <Redirect to="/403" />;
        }
        return (
            <DashboardLayout>
                <AntSuspense>{Component}</AntSuspense>
            </DashboardLayout>
        );
    };

    useEffect(() => {
        const _refreshToken = localToken.getToken();
        if (_refreshToken && !authState.accessToken) {
            refreshToken(dispatch, _refreshToken).then((res) => {
                if (res.result) {
                    getAuth(dispatch).then((res) => {
                        if (!res.result) {
                            message.error(res.message);
                            sessionToken.clearToken();
                            localToken.clearToken();
                            window.location.reload();
                            return;
                        }
                        setLoading(false);
                    });
                    return;
                }
                message.error(res.message);
                sessionToken.clearToken();
                localToken.clearToken();
                window.location.reload();
                return;
            });
        } else if (!_refreshToken && !authState.accessToken) {
            setLoading(false);
        }
        window.setInterval(() => {
            const _refreshToken = localToken.getToken();
            refreshToken(dispatch, _refreshToken);
        }, 25 * 60 * 1000);

        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Loading />;
    }
    return (
        <Switch>
            <Route
                path="/auth"
                render={() => {
                    if (!_sessionToken && !authState.accessToken) {
                        return (
                            <AntSuspense>
                                <Auth />
                            </AntSuspense>
                        );
                    }
                    return <Redirect to="/" />;
                }}
            />
            <Route
                exact
                path="/"
                render={() => {
                    return checkAuth(<Dashboard />);
                }}
            />
            <Route
                path="/dashboard"
                render={() => {
                    return checkAuth(<Dashboard />);
                }}
            />
            <Route
                path="/todo-management"
                render={() => {
                    return checkAdmin(<Todo />);
                }}
            />
            <Route
                path="/user-management"
                render={() => {
                    return checkAdmin(<User />);
                }}
            />
            <Route
                path="/type-management"
                render={() => {
                    return checkAdmin(<Type />);
                }}
            />
            <Route
                path="/profile"
                render={() => {
                    return checkAuth(<Profile />);
                }}
            />
            <Route
                exact
                path="/404"
                render={() => {
                    if (!_sessionToken && !authState.accessToken) {
                        return (
                            <AntSuspense>
                                <Auth />
                            </AntSuspense>
                        );
                    }
                    return (
                        <AntSuspense>
                            <NotFound />
                        </AntSuspense>
                    );
                }}
            />
            <Route
                exact
                path="/403"
                render={() => {
                    return (
                        <AntSuspense>
                            <NotAuthorized />
                        </AntSuspense>
                    );
                }}
            />
            <Redirect to="/404" />
        </Switch>
    );
}

export default AppRouter;
