import { Router } from "express";
import { summaryController } from "../controllers/predefinedController";

const predefineRoute = Router();

predefineRoute.get("/summary/:user_id/:book", summaryController);

export default predefineRoute;
