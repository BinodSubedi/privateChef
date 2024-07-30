import { Router } from "express";
import { validator } from "../validator";
import { fileUpload, uploadFileController } from "../controller/fileController";
import authenticator from "./../controller/auth";

const fileRouter = Router();

fileRouter.put("/upload", authenticator, fileUpload, uploadFileController);

export default fileRouter;
