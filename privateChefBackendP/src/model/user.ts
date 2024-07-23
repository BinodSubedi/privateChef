import { BaseModel } from "./base";
import { User, GetUserQuery } from "../interface/user";

class UserModel extends BaseModel {
  static async create(user: User) {
    const userToCreate = {
      userName: user.userName,
      email: user.email,
      password: user.password,
    };

    await this.queryBuilder().insert(userToCreate).table("users");
  }
}
