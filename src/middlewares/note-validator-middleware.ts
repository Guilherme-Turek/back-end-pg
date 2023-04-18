import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/repositories/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.errors";

export class NoteValidatorMiddleware {
  public static validUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = new UserDatabase().getById(id);

      if (user === null) {
        return RequestError.notFound(res, "User not found");
      }
      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public static ValidData(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      if (!title) {
        return RequestError.fieldNotProvided(res, "Username");
      }
      if (!description) {
        return RequestError.fieldNotProvided(res, "Password");
      }
      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
