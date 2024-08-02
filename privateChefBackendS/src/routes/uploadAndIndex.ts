import { Router } from "express";
import {
  fileUpload,
  uploadIndexController,
} from "../controllers/uploadIndexController";

const uploadAndIndexRoute = Router();

uploadAndIndexRoute.put("/", fileUpload, uploadIndexController);

export default uploadAndIndexRoute;
