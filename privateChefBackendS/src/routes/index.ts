import { Router } from "express";
import predefineRoute from "./predefinedQsnRoutes";
import questionRoute from "./questionRoutes";
import uploadAndIndexRoute from "./uploadAndIndex";

const router = Router();

router.use("/predefined", predefineRoute);
router.use("/questions", questionRoute);
router.use("/uploadIndex", uploadAndIndexRoute);

export default router;
