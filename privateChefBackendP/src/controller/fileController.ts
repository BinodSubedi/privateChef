import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FileFilterCallback } from "multer";
import { DatabaseError, MulterError } from "../error/error";
import { FileModel } from "../model/file";
import { File } from "../interface/file";

//Upload File

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../files`);
  },
  filename: (req, file, cb) => {
    // const filename = req.body.title.split(" ").join("");
    cb(null, `${file.originalname}`);
  },
});

const multerFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype == "application/pdf") {
    cb(null, true);
  } else {
    cb(new MulterError("Multer error"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
});

export const fileUpload = upload.single("file");

export const uploadFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;

    if (file == null || file == undefined) {
      throw new MulterError();
    }

    const inputVal: File = {
      user_id: +req.user.id,
      file_name: file.filename,
      file_type: "pdf",
    };

    await FileModel.create(inputVal);

    return res.status(StatusCodes.CREATED).json({
      message: "File created",
    });
  } catch (err) {
    next(err);
  }
};
