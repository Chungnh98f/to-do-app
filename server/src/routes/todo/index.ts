import express from "express";
import { deleteTodoController } from "../../controllers/todo/deleteTodoController";
import { adminGetAllTodoController } from "./../../controllers/todo/adminGetAllTodoController";
import { adminGetTodoByIdController } from "./../../controllers/todo/adminGetTodoByIdController";
import { createTodoController } from "./../../controllers/todo/createTodoController";
import { getAllTodoController } from "./../../controllers/todo/getAllTodoController";
import { getTodoByIdController } from "./../../controllers/todo/getTodoByIdController";
import { updateTodoController } from "./../../controllers/todo/updateTodoController";
import { checkJwt } from "./../../middlewares/checkJwt";
import { isAdmin } from "./../../middlewares/isAdmin";

const router = express.Router();

// Get all todos of current user
router.get("/all", checkJwt, getAllTodoController);

// Get a specific todo of current user
router.get("/detail/:id", checkJwt, getTodoByIdController);

// Create a todo by current user
router.post("/", checkJwt, createTodoController);

// Update a todo of current user
router.put("/:id", checkJwt, updateTodoController);

// Delete a todo of current user
router.delete("/:id", checkJwt, deleteTodoController);

// Get a specific todo of a user
router.get("/admin/detail/:id", checkJwt, isAdmin, adminGetTodoByIdController);

// Get all todos in database
router.get("/admin/all", checkJwt, isAdmin, adminGetAllTodoController);

export default router;
