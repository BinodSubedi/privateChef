import { File } from "../interface/file";
import { BaseModel } from "./base";

export class FileModel extends BaseModel {
  static async create(file: File) {
    const fileToCreate: File = {
      user_id: file.user_id,
      file_name: file.file_name,
      file_type: file.file_type,
    };

    await this.queryBuilder().insert(fileToCreate).table("File");
  }
}
