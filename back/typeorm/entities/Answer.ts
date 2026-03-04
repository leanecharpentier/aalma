import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Form } from "./Form";
import { User } from "./User";

@Entity("answer")
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content: string;

  @Column()
  user_id: number;

  @Column()
  form_id: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @ManyToOne(() => Form)
  @JoinColumn({ name: "form_id" })
  form?: Form;
}
