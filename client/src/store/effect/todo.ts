import { axiosInstance } from "../../config/axiosConfig";
import { ITodoInput } from "../interface";

export const createTodoEffect = async (data: ITodoInput) => {
    try {
        const { name, content, type } = data;
        return await axiosInstance.post("/todo", { name, content, type });
    } catch (error) {
        return error;
    }
};

export const getAllTodoEffect = async () => {
    try {
        return await axiosInstance.get("/todo/all");
    } catch (error) {
        return error;
    }
};

export const adminGetAllTodoEffect = async () => {
    try {
        return await axiosInstance.get("/todo/admin/all");
    } catch (error) {
        return error;
    }
};

export const updateTodoEffect = async (data: ITodoInput) => {
    try {
        const { id, name, content, is_completed, type } = data;
        return await axiosInstance.put(`/todo/${id}`, {
            name,
            content,
            is_completed,
            type,
        });
    } catch (error) {
        return error;
    }
};

export const deleteTodoEffect = async (id: number) => {
    try {
        return await axiosInstance.delete(`/todo/${id}`);
    } catch (error) {
        return error;
    }
};
