import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Action } from "./Action";
import { Priority } from "./Priority";

@Entity("booked_action")
export class BookedAction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { name: "action_id" })
  action_id: string;

  @ManyToOne(() => Action)
  @JoinColumn({ name: "action_id" })
  action?: Action;

  @Column("uuid", { name: "priority_id" })
  priority_id: string;

  @ManyToOne(() => Priority)
  @JoinColumn({ name: "priority_id" })
  priority?: Priority;

  @Column("date")
  startDate: Date;

  @Column("date")
  endDate: Date;
}