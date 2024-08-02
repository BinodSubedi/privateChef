import { Request, Response } from "express";
import { askingQuestions } from "../services/llmServices";

export const overallQsnController = async (req: Request, res: Response) => {
  try {
    const { user_id, question } = req.body;

    const answer = await askingQuestions(
      { user_id: +user_id },
      { qsn: question }
    );

    res.status(200).json({
      data: answer,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

export const specificBookQsnController = async (
  req: Request,
  res: Response
) => {
  try {
    const { user_id, book, question } = req.body;

    const answer = await askingQuestions({ user_id, book }, { qsn: question });

    res.status(200).json({
      data: answer,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};
