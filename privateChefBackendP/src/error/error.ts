import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err.stack);
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
  constructor(message: string = "Database Error", statusCode: number = 400) {
    super(message, statusCode);
  }
}

export class AuthError extends BaseError {
  constructor(
    message: string = "Authentication Error",
    statusCode: number = 400
  ) {
    super(message, statusCode);
  }
}

export class MulterError extends BaseError {
  constructor(message: string = "Multer Error", statusCode: number = 400) {
    super(message, statusCode);
  }
}

export class SecondaryBackendReqError extends BaseError {
  constructor(
    message: string = "Secondary Backend Request Error",
    statusCode: number = 400
  ) {
    super(message, statusCode);
  }
}
