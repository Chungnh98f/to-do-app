import express from "express";
import authRouter from "./auth";
import todoRouter from "./todo";
import typeRouter from "./type";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/todo", todoRouter);
router.use("/api/type", typeRouter);

export { router };
