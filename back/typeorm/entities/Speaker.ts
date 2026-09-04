import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Action } from "./Action";

@Entity("speaker")
export class Speaker {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 50, name: "last_name" })
  last_name: string;

  @Column("varchar", { length: 50, name: "first_name" })
  first_name: string;

  @Column("varchar", { nullable: true })
  exp: string;

  @Column("varchar", { nullable: true })
  job: string;

  @Column("varchar", { nullable: true })
  phone: string;

  @Column("varchar", { nullable: true })
  email: string;

  @OneToMany(() => Action, (action) => action.speaker, { nullable: true })
  actions?: Action[];
}