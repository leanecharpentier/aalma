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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  company_id: number;

  @Column()
  template_id: number;

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
