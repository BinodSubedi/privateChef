import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.statusCode).json({
    message: err.message,
  });
};

export class BaseError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class DatabaseError extends BaseError {
  constructor(message: string = "Database Error", statusCode: number = 500) {
    super(message, statusCode);
  }
}
