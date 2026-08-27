import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { BookedAction } from "./BookedAction";

@Entity("grade")
export class Grade {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { name: "booked_action_id" })
  booked_action_id: string;

  @ManyToOne(() => BookedAction)
  @JoinColumn({ name: "booked_action_id" })
  bookedAction?: BookedAction;

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