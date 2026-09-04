import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Action } from "./Action";

@Entity("format")
export class Format {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Action, (action) => action.format, { nullable: true })
  actions?: Action[];
}