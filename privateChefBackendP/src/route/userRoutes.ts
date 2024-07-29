import { Router } from "express";
import { validator } from "../validator";
import {
  loginRequestSchema,
  signupRequestSchema,
} from "../validator/userValidator";
import { userLogin, userSignup } from "../controller/userControllers";

const userRouter = Router();

userRouter.put("/signup", validator(signupRequestSchema), userSignup);
userRouter.post("/login", validator(loginRequestSchema), userLogin);

export default userRouter;
