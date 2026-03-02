import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { QuestionType } from "./QuestionType";

@Entity("question")
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  label: string;

  @Column()
  type_id: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @ManyToOne(() => QuestionType, { nullable: true })
  @JoinColumn({ name: "type_id" })
  type?: QuestionType;
}
