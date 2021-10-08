import React, { useReducer, createContext } from "react";
import { ITodoContext } from "../interface";
import { todoReducer, initTodoState } from "../reducers/todo";

const TodoStateContext = createContext<ITodoContext>({
    todoState: initTodoState,
    dispatch: () => null,
});

export function GetTodoStateContext(): ITodoContext {
    const context = React.useContext(TodoStateContext);
    if (context === undefined) {
        throw new Error("TodoStateContext not found");
    }
    return context;
}

// Provider
export const TodoStateProvider: React.FC = ({ children }) => {
    const [todoState, dispatch] = useReducer(todoReducer, initTodoState);

    return (
        <TodoStateContext.Provider value={{ todoState, dispatch }}>
            {children}
        </TodoStateContext.Provider>
    );
};
