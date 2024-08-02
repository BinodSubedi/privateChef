import multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { indexDocuments } from "../services/llmServices";

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
    console.log(req.body);

    const { user_id, book } = req.body;

    await indexDocuments({ user_id, book });

    return res.status(StatusCodes.CREATED).json({
      message: "File created",
    });
  } catch (err) {
    next(err);
  }
};
