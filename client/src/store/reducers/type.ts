import {
    GET_ALL_TYPE_ACTION,
    CREATE_TYPE_ACTION,
    UPDATE_TYPE_ACTION,
    DELETE_TYPE_ACTION,
} from "./../action/type/action";
import { IActionType, ITypeState } from "./../interface";

export const initTypeState: ITypeState = {
    pending: false,
    types: [],
};

export const typeReducer = (
    state = initTypeState,
    action: IActionType
): ITypeState => {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_TYPE_ACTION.GET_ALL_TYPE_PENDING:
        case CREATE_TYPE_ACTION.CREATE_TYPE_PENDING:
        case UPDATE_TYPE_ACTION.UPDATE_TYPE_PENDING:
        case DELETE_TYPE_ACTION.DELETE_TYPE_PENDING:
            return {
                ...state,
                pending: true,
            };
        case GET_ALL_TYPE_ACTION.GET_ALL_TYPE_FAILURE:
        case CREATE_TYPE_ACTION.CREATE_TYPE_FAILURE:
        case UPDATE_TYPE_ACTION.UPDATE_TYPE_FAILURE:
        case DELETE_TYPE_ACTION.DELETE_TYPE_FAILURE:
            return {
                ...state,
                pending: false,
            };

        case GET_ALL_TYPE_ACTION.GET_ALL_TYPE_SUCCESS:
            return {
                ...state,
                pending: false,
                types: payload,
            };

        case UPDATE_TYPE_ACTION.UPDATE_TYPE_SUCCESS:
            return {
                pending: false,
                types: [...state.types].map((type) => {
                    if (type.id !== payload.id) {
                        return type;
                    }
                    return { ...type, name: payload.name };
                }),
            };

        case CREATE_TYPE_ACTION.CREATE_TYPE_SUCCESS:
            return {
                pending: false,
                types: [...state.types].concat(payload),
            };

        case DELETE_TYPE_ACTION.DELETE_TYPE_SUCCESS:
            return {
                pending: false,
                types: [...state.types].filter((type) => type.id !== payload),
            };
        default:
            return state;
    }
};
