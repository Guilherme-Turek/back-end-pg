import config from "./database.config";
import { DataSource } from "typeorm";

export class DatabaseConnection {
  private static _connection: DataSource;

  public static async connect() {
    this._connection = await config.initialize();
    console.log("Database Connected");
  }

  public static get connection() {
    return this._connection;
  }
}
