import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { FormTemplate } from "./FormTemplate";
import { Question } from "./Question";

@Entity("form_template_question") // Nom de votre table de liaison
export class FormTemplateQuestion {
  @PrimaryColumn()
  template_id: number;

  @PrimaryColumn()
  question_id: number;

  @ManyToOne(() => FormTemplate)
  @JoinColumn({ name: "template_id" })
  template?: FormTemplate;

  @ManyToOne(() => Question)
  @JoinColumn({ name: "question_id" })
  question?: Question;
}
