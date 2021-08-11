import express from "express";
import authRouter from "./auth";
import todoRouter from "./todo";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/todo", todoRouter);

export { router };
