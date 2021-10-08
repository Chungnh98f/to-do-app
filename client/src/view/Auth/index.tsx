import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AntSuspense from "../../components/UI/AntSuspense";
import AuthenticationLayout from "../../layout/Authentication";

const SignInForm = lazy(() => import("../../components/Form/SignInForm"));
const SignUpForm = lazy(() => import("../../components/Form/SignUpForm"));

function Auth() {
    return (
        <AuthenticationLayout>
            <Switch>
                <Route exact path="/auth/sign-in">
                    <AntSuspense>
                        <SignInForm />
                    </AntSuspense>
                </Route>
                <Route exact path="/auth/sign-up">
                    <AntSuspense>
                        <SignUpForm />
                    </AntSuspense>
                </Route>
                <Redirect to="/auth/sign-in" />
            </Switch>
        </AuthenticationLayout>
    );
}

export default Auth;
