import React from "react";
import { GetAuthStateContext } from "../../store/context/auth";
import { Container } from "../UI/Container";
import Loading from "../UI/Loading";

function User() {
    const { authState } = GetAuthStateContext();

    return (
        <>
            <Container title="Profile">
                <p>Username: {authState.me?.username}</p>
                <p>Email: {authState.me?.email}</p>
            </Container>
            {authState.pending && <Loading />}
        </>
    );
}

export default User;
