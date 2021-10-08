import React, { useReducer, createContext } from "react";
import { IAuthContext } from "../interface";
import { authReducer, initAuthState } from "../reducers/auth";

const AuthStateContext = createContext<IAuthContext>({
    authState: initAuthState,
    dispatch: () => null,
});

export function GetAuthStateContext(): IAuthContext {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("AuthStateContext not found");
    }
    return context;
}

// Provider
export const AuthStateProvider: React.FC = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initAuthState);

    return (
        <AuthStateContext.Provider value={{ authState, dispatch }}>
            {children}
        </AuthStateContext.Provider>
    );
};
