import { Dispatch } from "react";
import {
    createTypeFailure,
    createTypePending,
    createTypeSuccess,
    deleteTypeFailure,
    deleteTypePending,
    deleteTypeSuccess,
    getAllTypeFailure,
    getAllTypePending,
    getAllTypeSuccess,
    updateTypeFailure,
    updateTypePending,
    updateTypeSuccess,
} from "../action/type/actionCreator";

import {
    createTypeEffect,
    deleteTypeEffect,
    getAllTypeEffect,
    updateTypeEffect,
} from "../effect/type";
import { IActionType, ITypeInput } from "../interface";

export const createType = async (
    dispatch: Dispatch<IActionType>,
    data: ITypeInput
) => {
    dispatch(createTypePending());
    const res: any = await createTypeEffect(data);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }
    if (res && res.status >= 200 && res.status <= 300) {
        const data = res?.data?.data;
        dispatch(createTypeSuccess(data));
        return {
            result: true,
            message: notification || "Create Type Successfully",
            data,
        };
    }
    dispatch(createTypeFailure(notification));
    return {
        result: false,
        message: notification || "Cannot Create Type",
    };
};

export const getAllType = async (dispatch: Dispatch<IActionType>) => {
    dispatch(getAllTypePending());
    const res: any = await getAllTypeEffect();
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }
    if (res && res.status >= 200 && res.status <= 300) {
        const types = res.data.data;

        dispatch(getAllTypeSuccess(types || []));
        return {
            result: true,
            message: notification || "Get all types",
        };
    }
    dispatch(getAllTypeFailure(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Something Went Wrong",
    };
};

export const updateType = async (
    dispatch: Dispatch<IActionType>,
    data: ITypeInput
) => {
    dispatch(updateTypePending());
    const res: any = await updateTypeEffect(data);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }
    if (res && res.status >= 200 && res.status <= 300) {
        dispatch(updateTypeSuccess(data));
        return {
            result: true,
            message: notification || "Update type successful",
        };
    }
    dispatch(updateTypeFailure(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Something Went Wrong",
    };
};

export const deleteType = async (
    dispatch: Dispatch<IActionType>,
    id: number
) => {
    dispatch(deleteTypePending());
    const res: any = await deleteTypeEffect(id);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }

    if (res && res.status >= 200 && res.status <= 300) {
        dispatch(deleteTypeSuccess(id));
        return {
            result: true,
            message: notification || "Delete type Successfully",
        };
    }
    dispatch(deleteTypeFailure(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Something went wrong",
    };
};
