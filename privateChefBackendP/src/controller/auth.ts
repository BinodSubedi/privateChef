import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "./../config";
import UserModel from "../model/user";
import { AuthError } from "../error/error";
import { User } from "../interface/user";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      return res.status(400).json({
        status: "fail",
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret!) as {
      id: number;
      iat: number;
      exp: number;
    };

    const thatUser = await UserModel.getUserById(decoded.id);

    if (thatUser != undefined || thatUser != null) {
      if (Date.now() < decoded.exp * 1000) {
        req.user = thatUser;
        next();
        return;
      } else {
        throw new AuthError();
      }
    } else {
      throw new AuthError();
    }
  } catch (err) {
    next(err);
  }
};
