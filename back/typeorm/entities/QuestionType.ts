import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity("question_type")
export class QuestionType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  label: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @OneToMany(
    () => Question,
    (question) => question.type,
    { nullable: true },
  )
  @JoinColumn({ name: "type_id" })
  questions?: Question[];
}
