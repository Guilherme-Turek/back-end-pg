import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/repositories/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.errors";

export class UserValidatorMiddleware {
  public static validateRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username, password, confirmPassword } = req.body;
      const userExist = new UserDatabase().getByUsername(username);
      if (!username) {
        return RequestError.fieldNotProvided(res, "Username");
      }
      if (!password) {
        return RequestError.fieldNotProvided(res, "Password");
      }
      if (!confirmPassword) {
        return RequestError.fieldNotProvided(res, "Confirm password");
      }
      if (password !== confirmPassword) {
        return RequestError.invalidData(res, "Passwords do not match");
      }
      if (userExist !== null) {
        return RequestError.invalidData(res, "User already exists");
      }
      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public static validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      if (!username) {
        return RequestError.fieldNotProvided(res, "Username");
      }
      if (!password) {
        return RequestError.fieldNotProvided(res, "Password");
      }
      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
