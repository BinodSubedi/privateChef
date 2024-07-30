import { Router } from "express";
import {
  fileUpload,
  getAllUploadedFilesController,
  uploadFileController,
} from "../controller/fileController";
import authenticator from "./../controller/auth";

const fileRouter = Router();

fileRouter.put("/upload", authenticator, fileUpload, uploadFileController);
fileRouter.get("/getAllFiles", authenticator, getAllUploadedFilesController);

export default fileRouter;
