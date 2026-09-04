import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Action } from "./Action";

@Entity("review")
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { name: "available_action_id" })
  available_action_id: string;

  @ManyToOne(() => Action)
  @JoinColumn({ name: "available_action_id" })
  action?: Action;

  @Column("uuid", { name: "user_id" })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @Column("int")
  grade: number;

  @Column("text")
  comment: string;
}