import { Request, Response } from "express";
import { UserDatabase } from "../database/repositories/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.errors";
import { Note, NotesStatus } from "../models/note.model";
import { SucessResponse } from "../util/sucess.response";
import { NoteDatabase } from "../database/repositories/note.database";

export class NoteController {
  public async list(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, status } = req.query;

      const database = new NoteDatabase();
      let noteList = await database.list(id, title ? String(title) : undefined);

      const result = noteList.map((note) => note.toJson());

      return SucessResponse.ok(res, "Notes listed", result);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public async create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const user = new UserDatabase().getById(id);

      if (user === null) {
        return RequestError.notFound(res, "User not found");
      }

      const database = new NoteDatabase();

      const note = new Note(title, description);

      const result = await database.create(note, id);

      return SucessResponse.created(
        res,
        "Note was successfully create",
        result.toJson()
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public async uptade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { noteId } = req.params;
      const { title, description, status } = req.body;

      const user = new UserDatabase().getById(id);

      if (user === null) {
        return RequestError.notFound(res, "User not found");
      }

      const note = new NoteDatabase().getById(noteId);

      if (note === null) {
        return RequestError.notFound(res, "Note not found");
      }

      const data = {
        title,
        description,
        status,
      };

      const result = await new NoteDatabase().update(noteId, data);
      return SucessResponse.ok(res, "Note success uptade", result);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { noteId } = req.params;

      const user = new UserDatabase().getById(id);

      if (user === null) {
        return RequestError.notFound(res, "User not found");
      }

      const note = new NoteDatabase().getById(noteId);

      if (note === null) {
        return RequestError.notFound(res, "Note not found");
      }

      const result = await new NoteDatabase().delete(noteId);

      // const result = noteDelete.map((notes) => notes.toJson());

      return SucessResponse.ok(res, "Note success delete", result);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
