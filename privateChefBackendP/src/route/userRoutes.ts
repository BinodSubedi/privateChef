import { Router } from "express";
import { validator } from "../validator";
import {
  loginRequestSchema,
  signupRequestSchema,
} from "../validator/userValidator";
import {
  pushLogin,
  userLogin,
  userLogout,
  userSignup,
} from "../controller/userControllers";
import authenticator from "./../controller/auth";

const userRouter = Router();

userRouter.put("/signup", validator(signupRequestSchema), userSignup);
userRouter.post("/login", validator(loginRequestSchema), userLogin);
userRouter.get("/logout", authenticator, userLogout);
userRouter.get("/pushLogin", authenticator, pushLogin);

export default userRouter;
