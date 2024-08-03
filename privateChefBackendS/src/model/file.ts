import { BaseModel } from "./base";

export default class FileModel extends BaseModel {
  static async fileAttributeUpdater(id: number) {
    await this.queryBuilder()
      .where({ id })
      .update({ indexed: true })
      .table("File");
  }
}
