import { Request, Response } from "express";
import { UserDatabase } from "../database/repositories/user.database";
import { ServerError } from "../errors/server.errors";
import { User } from "../models/user.model";
import { SucessResponse } from "../util/sucess.response";
import { RequestError } from "../errors/request.error";

export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const database = new UserDatabase();

      const user = new User(username, password);

      const result = await database.userCreate(user);

      return SucessResponse.created(
        res,
        "User was successfully create",
        result.toJson()
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const database = new UserDatabase();
      const user = await database.findUser(username, password);

      if (user === null) {
        return RequestError.notFound(res, "User not found");
      }

      return SucessResponse.ok(res, "Successful login", user.toJson());
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public async list(req: Request, res: Response) {
    try {
      const database = new UserDatabase();
      let usersList = await database.findAll();

      const result = usersList.map((user) => user.toJson());

      return SucessResponse.ok(res, "Users listed", result);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
