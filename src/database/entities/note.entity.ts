import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Note, NotesStatus } from "../../models/note.model";
import { UserEntity } from "./user.entity";

@Entity({
  name: "note",
})
export class NoteEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    name: "id_user",
  })
  idUser: string;

  @Column({
    type: "varchar",
    enum: ["active", "filed"],
  })
  status: NotesStatus;

  @CreateDateColumn({
    name: "dthr_create",
  })
  dthrCreate: Date;

  @CreateDateColumn({
    name: "dthr_update",
  })
  dthrUpdate: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_user",
  })
  user: UserEntity;
}
