import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import config from "../config";

export const passwordComparer = async (
  normalPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(normalPassword, hashedPassword);
};

export const jwtTokenSigning = (id: string) => {
  return jwt.sign({ id }, `${config.jwt.secret}`, {
    expiresIn: config.jwt.expires,
  });
};
