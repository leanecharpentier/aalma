import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { QuestionType } from "./QuestionType";
import { Proposition } from "./Proposition";
import { FormTemplateQuestion } from "./FormTemplateQuestion";
import { FormTemplate } from "./FormTemplate";
import { Answer } from "./Answer";

@Entity("question")
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  label: string;

  @Column()
  type_id: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @ManyToOne(() => QuestionType)
  @JoinColumn({ name: "type_id" })
  type?: QuestionType;

  @OneToMany(
    () => Proposition,
    (proposition) => proposition.question,
    { nullable: true },
  )
  @JoinColumn({ name: "question_id" })
  propositions?: Proposition[];

  @OneToMany(
    () => FormTemplateQuestion,
    (ftq) => ftq.question,
    { nullable: true },
  )
  @JoinColumn({ name: "question_id" })
  templates?: FormTemplateQuestion[];

  @OneToMany(
    () => Answer,
    (answer) => answer.question,
    { nullable: true },
  )
  @JoinColumn({ name: "question_id" })
  answers?: Answer[];
}
