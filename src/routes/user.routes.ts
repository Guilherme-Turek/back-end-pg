import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { UserController } from "../controllers/user.controller";
import { NoteValidatorMiddleware } from "../middlewares/note-validator-middleware";
import { UserValidatorMiddleware } from "../middlewares/user-validator-middleware";

export const userRoutes = () => {
  const app = Router();
  app.get("/users", new UserController().list);

  app.post(
    "/users",
    // UserValidatorMiddleware.validateRegister,
    new UserController().create
  );

  app.post(
    "/login",
    // UserValidatorMiddleware.validateLogin,
    new UserController().login
  );

  app.get(
    "/users/:id/notes",
    NoteValidatorMiddleware.validUser,
    new NoteController().list
  );

  app.post(
    "/users/:id/notes",
    // NoteValidatorMiddleware.validUser,
    // NoteValidatorMiddleware.ValidData,
    new NoteController().create
  );

  app.put(
    "/users/:id/notes/:noteId",
    NoteValidatorMiddleware.validUser,
    new NoteController().uptade
  );

  app.delete(
    "/users/:id/notes/:noteId",
    NoteValidatorMiddleware.validUser,
    new NoteController().delete
  );

  return app;
};
