import { v4 as createUuid } from "uuid";
import { Note } from "./note.model";

export class User {
  private _id: string;
  private _notes: Note[];

  constructor(private _username: string, private _password: string) {
    this._id = createUuid();
    this._notes = [];
  }

  public get id() {
    return this._id;
  }
  public get username() {
    return this._username;
  }
  public get password() {
    return this._password;
  }
  public get notes() {
    return this._notes;
  }
  public set username(username: string) {
    this._username = username;
  }
  public set password(password: string) {
    this._password = password;
  }
  public set notes(notes: Note[]) {
    this._notes = notes;
  }
  public toJson() {
    return {
      id: this._id,
      username: this._username,
      notes: this._notes,
    };
  }

  public static create(
    id: string,
    username: string,
    password: string,
    notes?: Note[]
  ) {
    const user = new User(username, password);
    user._id = id;
    user._notes = notes ?? [];

    return user;
  }
}
