import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity("proposition")
export class Proposition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content: string;

  @Column()
  question_id: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id" })
  question?: Question;
}
