import multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { indexDocuments } from "../services/llmServices";
import FileModel from "../model/file";

//Upload File

// multer section start
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../../testFiles`);
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
    cb(new Error("Multer error"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
});

export const fileUpload = upload.single("file");

// multer section end

// Controller section start

export const uploadIndexController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, book, id } = req.body;

    await indexDocuments({ user_id, book });

    //Update the value of the document to be indexed

    await FileModel.fileAttributeUpdater(id);

    return res.status(StatusCodes.CREATED).json({
      message: "File created",
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};
