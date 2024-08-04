import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FileFilterCallback } from "multer";
import { AuthError, DatabaseError, MulterError } from "../error/error";
import { FileModel } from "../model/file";
import { File } from "../interface/file";
import FormData from "form-data";
import fs from "fs";
import axiosBackendSConfig from "../axiosBackendSConfig";
import jwt from "jsonwebtoken";
import config from "./../config";
//Upload File

// multer section start
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

// multer section end

// Controller section start

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

    const createdFileId = await FileModel.create(inputVal);

    const formData = new FormData();

    const path = `${__dirname}/../../files`;

    formData.append(
      "file",
      fs.createReadStream(path + `/${file.originalname}`),
      {
        filename: file.originalname,
        contentType: file.mimetype,
      }
    );

    formData.append("book", inputVal.file_name);
    formData.append("user_id", inputVal.user_id);
    formData.append("id", createdFileId);

    // Not awaited because we don't need to know if it's index or not
    // We only need to know when asking Question thrugh vectorStore

    setImmediate(async () => {
      try {
        axiosBackendSConfig.put("/uploadIndex", formData, {
          headers: formData.getHeaders(),
        });
      } catch (err) {
        console.log(err);
      }
    });

    return res.status(StatusCodes.CREATED).json({
      message: "File created",
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUploadedFilesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allFiles = await FileModel.getAllFiles(req.user.id);

    if (allFiles == null) {
      throw new DatabaseError("File all scan error");
    }

    res.status(StatusCodes.OK).json({
      message: "Files list fetching success",
      data: allFiles,
    });
  } catch (err) {
    next(err);
  }
};

export const shareForDownload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const { book } = req.params;

    const resp = await FileModel.checkFile(id, book);

    if (!resp) {
      throw new DatabaseError("Could not find the appropriate file");
    }

    //Changing shared attribute to true

    const changed = await FileModel.shareFile(id, book);

    if (!changed) {
      throw new DatabaseError("Could not update the file data for sharing");
    }

    const token = jwt.sign({ id, book }, config.jwt.secret!, {
      expiresIn: config.jwt.expires,
    });

    res.status(200).json({
      message: "Shared",
      url: `http://localhost:3000/api/file/downloadShare/${token}`,
    });
  } catch (err) {
    next(err);
  }
};

export const getShareDownloadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    if (!jwt.verify(token, config.jwt.secret!)) {
      throw new AuthError("Token could not be verified");
    }

    const decoded = jwt.decode(token) as { id: string; book: string };

    const shareOrNot = await FileModel.shareOrNot(+decoded.id, decoded.book);

    if (!shareOrNot) {
      return res.status(400).json({
        message: "forbidden",
      });
    }

    await FileModel.makeUnshareable(+decoded.id, decoded.book);

    res.download(`${__dirname}/../../files/rvalp.pdf`, (err) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    });
  } catch (err) {
    next(err);
  }
};
