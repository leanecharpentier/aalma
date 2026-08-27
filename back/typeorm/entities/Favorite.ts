import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Action } from "./Action";

@Entity("favorite")
export class Favorite {
  @PrimaryColumn("uuid", { name: "user_id" })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @PrimaryColumn("uuid", { name: "available_action_id" })
  available_action_id: string;

  @ManyToOne(() => Action)
  @JoinColumn({ name: "available_action_id" })
  action?: Action;
}