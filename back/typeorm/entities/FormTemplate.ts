import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Form } from "./Form";
import { FormTemplateQuestion } from "./FormTemplateQuestion";

@Entity("form_template")
export class FormTemplate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @OneToMany(
    () => Form,
    (form) => form.template,
  )
  @JoinColumn({ name: "template_id" })
  forms?: Form[];

  @OneToMany(
    () => FormTemplateQuestion,
    (ftq) => ftq.template,
    { nullable: true },
  )
  @JoinColumn({ name: "question_id" })
  questions?: FormTemplateQuestion[];
}
