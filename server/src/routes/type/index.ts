import express from "express";
import { createTypeController } from "../../controllers/type/createTypeController";
import { deleteTypeController } from "../../controllers/type/deleteTypeController";
import { getAllTypeController } from "./../../controllers/type/getAllTypeController";
import { updateTypeController } from "./../../controllers/type/updateTypeController";
import { checkJwt } from "./../../middlewares/checkJwt";
import { isAdmin } from "./../../middlewares/isAdmin";

const router = express.Router();

// Get all type
router.get("/all", checkJwt, getAllTypeController);

// Create a type
router.post("/", checkJwt, isAdmin, createTypeController);

// Update a type
router.put("/:id", checkJwt, isAdmin, updateTypeController);

// Delete a type
router.delete("/:id", checkJwt, isAdmin, deleteTypeController);

export default router;
