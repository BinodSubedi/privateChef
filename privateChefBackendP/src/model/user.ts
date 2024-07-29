import { BaseModel } from "./base";
import { User, GetUserQuery } from "../interface/user";

class UserModel extends BaseModel {
  static async create(user: User) {
    const userToCreate = {
      userName: user.userName,
      email: user.email,
      password: user.password,
    };

    await this.queryBuilder().insert(userToCreate).table("User");
  }

  static async getUser(userName: String) {
    const user = await this.queryBuilder()
      .select("*")
      .where({ userName })
      .table("User")
      .first();

    return user;
  }

  static async checkUserExistence(userName: String) {
    const user = await this.queryBuilder()
      .select("*")
      .where({ userName })
      .table("User");

    return user.length == 1 ? true : false;
  }
}

export default UserModel;
