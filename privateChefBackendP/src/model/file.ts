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

  static async getAllFiles(user_id: number): Promise<File[] | null> {
    let files: File[] | null;
    try {
      files = await this.queryBuilder()
        .select("*")
        .where({ user_id })
        .table("File");
    } catch (err) {
      files = null;
    }

    return files;
  }
}
