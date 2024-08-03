import { Router } from "express";
import {
  overallQuestionController,
  specificBookQuestionController,
  summaryController,
} from "../controller/questionsController";
import authenticator from "./../controller/auth";

const questionRouter = Router();

questionRouter.get("/summary/:book", authenticator, summaryController);
questionRouter.post(
  "/overallQuestion",
  authenticator,
  overallQuestionController
);
questionRouter.post(
  "/bookSpecificQuestion",
  authenticator,
  specificBookQuestionController
);

export default questionRouter;
