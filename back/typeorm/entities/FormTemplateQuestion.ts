import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FormTemplate } from "./FormTemplate";
import { Question } from "./Question";

@Entity("form_template_question") // Nom de votre table de liaison
export class FormTemplateQuestion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryColumn()
  question_id: string;

  @ManyToOne(() => FormTemplate)
  @JoinColumn({ name: "template_id" })
  template?: FormTemplate;

  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id" })
  question?: Question;
}
