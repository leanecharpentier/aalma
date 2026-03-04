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

@Entity("form_template")
export class FormTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

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
}
