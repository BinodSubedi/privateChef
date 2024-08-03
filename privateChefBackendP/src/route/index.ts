import { Router } from "express";
import userRouter from "./userRoutes";
import fileRouter from "./fileRoutes";
import questionRouter from "./questionRoutes";

const router = Router();

router.use("/user", userRouter);
router.use("/file", fileRouter);
router.use("/question", questionRouter);

export default router;
