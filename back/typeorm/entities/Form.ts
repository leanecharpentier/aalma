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
import { Company } from "./Company";
import { FormTemplate } from "./FormTemplate";
import { Answer } from "./Answer";

@Entity("form")
export class Form {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  company_id: string;

  @Column()
  template_id: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @ManyToOne(() => Company)
  @JoinColumn({ name: "company_id" })
  company?: Company;

  @ManyToOne(() => FormTemplate)
  @JoinColumn({ name: "template_id" })
  template?: FormTemplate;

  @OneToMany(
    () => Answer,
    (answer) => answer.form,
    { nullable: true },
  )
  @JoinColumn({ name: "form_id" })
  answers?: Answer[];
}
