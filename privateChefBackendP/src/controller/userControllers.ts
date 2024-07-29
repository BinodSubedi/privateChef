import { NextFunction, Request, Response } from "express";
import { userLoginService, userSignupService } from "../service/userServices";
import { StatusCodes } from "http-status-codes";

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const userVal = await userSignupService(user);
    userVal.password = "";

    return res.status(StatusCodes.CREATED).json({
      message: "User Signup Done",
      user: userVal,
    });
  } catch (err) {
    next(err);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;

    const getResponseData = await userLoginService(user);

    return res.status(StatusCodes.OK).json({
      message: "Login Success",
      data: getResponseData,
    });
  } catch (err) {
    next(err);
  }
};
