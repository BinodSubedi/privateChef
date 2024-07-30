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

const sendFakeCookie = (res: Response) => {
  res.cookie("jwt", "0", {
    expires: new Date(Date.now() + 30 / 90),
    // secure: false,
    httpOnly: true,
  });
};

const sendCookie = (res: Response, token: string) => {
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    // secure: false,
    httpOnly: true,
  });
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;

    const getResponseData = await userLoginService(user);

    sendCookie(res, getResponseData.token!);

    const { token, ...data } = getResponseData;

    return res.status(StatusCodes.OK).json({
      message: "Login Success",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};
