import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { NoteEntity } from "./note.entity";

@Entity({
  name: "user",
})
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({
    name: "dthr_create",
  })
  dthrCreate: Date;

  @OneToMany(() => NoteEntity, (note) => note.user)
  notes: NoteEntity[];
}
