import { Note, NotesStatus } from "../../models/note.model";
import { DatabaseConnection } from "../config/database.connection";
import { NoteEntity } from "../entities/note.entity";

export class NoteDatabase {
  public async create(note: Note, id: string) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(NoteEntity);

    const noteEntity = repository.create({
      id: note.id,
      title: note.title,
      description: note.description,
      status: note.status,
      idUser: id,
    });

    const result = await repository.save(noteEntity);

    return this.mapEntityToModel(result);
  }

  public async list(idUser: string, title?: string, status?: NotesStatus) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(NoteEntity);

    const result = await repository.find({
      where: {
        idUser: idUser,
        title,
        status,
      },
      relations: ["user"],
    });
    return result.map((note) => this.mapEntityToModel(note));
  }

  public async getById(id: string) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(NoteEntity);

    const result = await repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async delete(id: string) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(NoteEntity);

    const result = await repository.delete({
      id,
    });

    return result.affected ?? 0;
  }

  public async update(id: string, data?: any) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(NoteEntity);

    const result = await repository.update(
      {
        id,
      },
      {
        title: data.title,
        description: data.description,
        status: data.status,
      }
    );

    if (result.affected === 1) {
      return {
        id,
        data,
      };
    }

    return null;
  }

  private mapEntityToModel(entity: NoteEntity): Note {
    return Note.create(entity.id.trim(), entity.title, entity.description);
  }
}
