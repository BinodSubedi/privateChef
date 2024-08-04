import { File } from "../interface/file";
import { BaseModel } from "./base";

export class FileModel extends BaseModel {
  static async create(file: File): Promise<number> {
    const fileToCreate: File = {
      user_id: file.user_id,
      file_name: file.file_name,
      file_type: file.file_type,
    };

    const response = await this.queryBuilder()
      .insert(fileToCreate)
      .returning("id")
      .table("File");

    return response[0].id;
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

  static async checkFile(user_id: number, file_name: string): Promise<boolean> {
    const response = await this.queryBuilder()
      .select("*")
      .where({ user_id, file_name })
      .table("File");

    return response.length == 0 ? false : true;
  }

  static async shareFile(user_id: number, file_name: string): Promise<boolean> {
    const response = await this.queryBuilder()
      .where({ user_id, file_name })
      .update({ shared: true })
      .returning("id")
      .table("File");

    return response.length == 0 ? false : true;
  }

  static async shareOrNot(
    user_id: number,
    file_name: string
  ): Promise<boolean> {
    const response = await this.queryBuilder()
      .where({ user_id, file_name })
      .returning("*")
      .table("File")
      .first();

    return response.shared;
  }

  static async makeUnshareable(
    user_id: number,
    file_name: string
  ): Promise<boolean> {
    const response = await this.queryBuilder()
      .where({ user_id, file_name })
      .update({ shared: false })
      .returning("id")
      .table("File");

    return response.length == 0 ? false : true;
  }
}
