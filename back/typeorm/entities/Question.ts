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
}
