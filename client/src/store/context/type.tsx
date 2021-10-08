import React, { useReducer, createContext } from "react";
import { ITypeContext } from "../interface";
import { typeReducer, initTypeState } from "../reducers/type";

const TypeStateContext = createContext<ITypeContext>({
    typeState: initTypeState,
    dispatch: () => null,
});

export function GetTypeStateContext(): ITypeContext {
    const context = React.useContext(TypeStateContext);
    if (context === undefined) {
        throw new Error("TypeStateContext not found");
    }
    return context;
}

// Provider
export const TypeStateProvider: React.FC = ({ children }) => {
    const [typeState, dispatch] = useReducer(typeReducer, initTypeState);

    return (
        <TypeStateContext.Provider value={{ typeState, dispatch }}>
            {children}
        </TypeStateContext.Provider>
    );
};
