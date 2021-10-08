import { axiosInstance } from "../../config/axiosConfig";
import {  ITypeInput } from "../interface";

export const createTypeEffect = async (data: ITypeInput) => {
    try {
        const { name } = data;
        return await axiosInstance.post("/type", { name });
    } catch (error) {
        return error;
    }
};

export const getAllTypeEffect = async () => {
    try {
        return await axiosInstance.get("/type/all");
    } catch (error) {
        return error;
    }
};

export const updateTypeEffect = async (data: ITypeInput) => {
    try {
        const { id, name } = data;
        return await axiosInstance.put(`/type/${id}`, {
            name,
        });
    } catch (error) {
        return error;
    }
};

export const deleteTypeEffect = async (id: number) => {
    try {
        return await axiosInstance.delete(`/type/${id}`);
    } catch (error) {
        return error;
    }
};
