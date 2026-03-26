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
import { Question } from "./Question";

@Entity("answer")
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content: string;

  @Column()
  user_id: string;

  @Column()
  form_id: number;

  @Column()
  question_id: number;

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

  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id" })
  question?: Question;
}
