import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity("action")
export class Action {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("text", { name: "category_id" })
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @Column("text")
  description: string;

  @Column("text")
  schedule: string;

  @Column("int")
  ideal_group_low: number;

  @Column("int")
  ideal_group_high: number;

  @Column("int")
  duration_in_minute: number;

  @Column("bool")
  in_person: boolean;

  @Column("int", { nullable: true })
  price: number;

  @Column("int", { nullable: true })
  note: number;

  @Column("int")
  reservation: number;

  @Column("bool")
  system: boolean;
}

export const RESERVATION_NEEDED = 1;
export const RESERVATION_POSSIBLE = 2;
export const RESERVATION_UNAVAILABLE = 3;
