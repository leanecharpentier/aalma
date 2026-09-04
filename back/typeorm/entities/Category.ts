import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Action } from "./Action";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => Action,
    (action) => action.category,
    { nullable: true },
  )
  @JoinColumn({ name: "category_id" })
  actions?: Action[];
}
