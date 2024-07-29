import { DatabaseError } from "../error/error";
import { User, UserLogin } from "../interface/user";
import UserModel from "../model/user";
import { jwtTokenSigning, passwordComparer } from "../utils";
import { hashPassword } from "../utils/encryption";

export const userSignupService = async (user: User): Promise<User> => {
  const hashed = await hashPassword(user.password!);
  user.password = hashed;
  const check = await UserModel.checkUserExistence(user.userName);
  if (check) {
    throw new DatabaseError("User Already exists");
  }
  await UserModel.create(user);
  return user;
};

export const userLoginService = async (user: UserLogin): Promise<User> => {
  const requiredUser = await UserModel.getUser(user.userName);

  if (requiredUser == null) {
    throw new DatabaseError("User doesnot exist");
  }

  console.log("user:::", requiredUser);

  if (!(await passwordComparer(user.password, requiredUser.password))) {
    throw new DatabaseError("Wrong Credentials");
  }

  const token = jwtTokenSigning(requiredUser.id);

  //   console.log("token::", token);
  return {
    userName: user.userName,
    token,
  };
};
