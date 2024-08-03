import { Request, Response, NextFunction } from "express";
import axiosBackendSConfig from "../axiosBackendSConfig";
import { SecondaryBackendReqError } from "../error/error";

export const summaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { book } = req.params;

    let summary;

    try {
      summary = await axiosBackendSConfig.get(
        `/predefined/summary/${req.user.id}/${book}`
      );
    } catch (err) {
      throw new SecondaryBackendReqError();
    }

    res.status(200).json({
      data: summary.data.data,
    });
  } catch (err) {
    next(err);
  }
};

export const overallQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { question } = req.body;

    let answer;

    try {
      answer = await axiosBackendSConfig.post("/questions/overall", {
        user_id: req.user.id,
        question,
      });
    } catch (err) {
      throw new SecondaryBackendReqError("Overall Question request error");
    }

    res.status(200).json({
      data: answer.data.data,
    });
  } catch (err) {
    next(err);
  }
};

export const specificBookQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { question, book } = req.body;

    let answer;

    try {
      answer = await axiosBackendSConfig.post("/questions/bookSpecific", {
        user_id: req.user.id,
        book,
        question,
      });
    } catch (err) {
      throw new SecondaryBackendReqError("Specific Question request error");
    }

    res.status(200).json({
      data: answer.data.data,
    });
  } catch (err) {
    next(err);
  }
};
