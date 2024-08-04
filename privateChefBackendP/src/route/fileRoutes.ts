import { Router } from "express";
import {
  fileUpload,
  getAllUploadedFilesController,
  getShareDownloadController,
  shareForDownload,
  uploadFileController,
} from "../controller/fileController";
import authenticator from "./../controller/auth";

const fileRouter = Router();

fileRouter.put("/upload", authenticator, fileUpload, uploadFileController);
fileRouter.get("/getAllFiles", authenticator, getAllUploadedFilesController);
fileRouter.get("/share/:book", authenticator, shareForDownload);
fileRouter.get("/downloadShare/:token", getShareDownloadController);

export default fileRouter;
