import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const validator = (schemaValidation: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schemaValidation.validate(req.body);

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
    }

    req.body = value;
    next();
  };
};
