import { Router } from "express";
import {
  overallQsnController,
  specificBookQsnController,
} from "../controllers/questionsController";

const questionRoute = Router();

questionRoute.post("/overall", overallQsnController);
questionRoute.post("/bookSpecific", specificBookQsnController);

export default questionRoute;
