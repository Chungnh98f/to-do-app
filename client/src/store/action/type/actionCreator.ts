import { ITypeInput } from "../../interface";
import {
    DELETE_TYPE_ACTION,
    CREATE_TYPE_ACTION,
    GET_ALL_TYPE_ACTION,
    UPDATE_TYPE_ACTION,
} from "./action";

export function createTypePending() {
    return {
        type: CREATE_TYPE_ACTION.CREATE_TYPE_PENDING,
    };
}

export function createTypeSuccess(type: ITypeInput) {
    return {
        type: CREATE_TYPE_ACTION.CREATE_TYPE_SUCCESS,
        payload: type,
    };
}

export function createTypeFailure(err: string) {
    return {
        type: CREATE_TYPE_ACTION.CREATE_TYPE_FAILURE,
        payload: err,
    };
}

export function getAllTypePending() {
    return {
        type: GET_ALL_TYPE_ACTION.GET_ALL_TYPE_PENDING,
    };
}

export function getAllTypeSuccess(data: ITypeInput[]) {
    return {
        type: GET_ALL_TYPE_ACTION.GET_ALL_TYPE_SUCCESS,
        payload: data,
    };
}

export function getAllTypeFailure(err: string) {
    return {
        type: GET_ALL_TYPE_ACTION.GET_ALL_TYPE_FAILURE,
        payload: err,
    };
}

export function updateTypePending() {
    return {
        type: UPDATE_TYPE_ACTION.UPDATE_TYPE_PENDING,
    };
}

export function updateTypeSuccess(data: ITypeInput) {
    return {
        type: UPDATE_TYPE_ACTION.UPDATE_TYPE_SUCCESS,
        payload: data,
    };
}

export function updateTypeFailure(err: string) {
    return {
        type: UPDATE_TYPE_ACTION.UPDATE_TYPE_FAILURE,
        payload: err,
    };
}

export function deleteTypePending() {
    return {
        type: DELETE_TYPE_ACTION.DELETE_TYPE_PENDING,
    };
}

export function deleteTypeSuccess(id: number) {
    return {
        type: DELETE_TYPE_ACTION.DELETE_TYPE_SUCCESS,
        payload: id,
    };
}

export function deleteTypeFailure(err: string) {
    return {
        type: DELETE_TYPE_ACTION.DELETE_TYPE_FAILURE,
        payload: err,
    };
}
