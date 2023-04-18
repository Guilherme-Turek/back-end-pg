import { v4 as createUuid } from "uuid";

export enum NotesStatus {
  active = "active",
  filed = "filed",
}

export class Note {
  private _id: string;
  private _status: NotesStatus;

  constructor(private _title: string, private _description: string) {
    this._id = createUuid();
    this._status = NotesStatus.active;
  }

  public get id() {
    return this._id;
  }
  public get title() {
    return this._title;
  }
  public get description() {
    return this._description;
  }
  public get status() {
    return this._status;
  }
  public set title(title: string) {
    this._title = title;
  }
  public set description(description: string) {
    this._description = description;
  }
  public set status(status: NotesStatus) {
    this._status = status;
  }
  public toJson() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      status: this._status,
    };
  }

  public static create(
    id: string,
    title: string,
    description: string,
    notes?: Note[]
  ) {
    const user = new Note(title, description);
    user._id = id;
    user._status = NotesStatus.active;

    return user;
  }
}
