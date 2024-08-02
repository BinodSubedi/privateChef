import { Request, Response } from "express";
import { makingSummary } from "../services/llmServices";

export const summaryController = async (req: Request, res: Response) => {
  try {
    const { user_id, book } = req.params;

    const response = await makingSummary({ user_id: +user_id, book });

    return res.status(200).json({
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};
