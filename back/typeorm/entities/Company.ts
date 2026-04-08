import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Color } from "./Color";
import { Team } from "./Team";
import { Form } from "./Form";

@Entity("company")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("text", { name: "color_id", nullable: true })
  color_id?: string;

  @Column({ nullable: true })
  googleDomain: string;

  @Column({ name: "microsoft_tenant_id", nullable: true })
  microsoftTenantId: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date = new Date();

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date = new Date();

  @ManyToOne(() => Color, { nullable: true })
  @JoinColumn({ name: "color_id" })
  color?: Color;

  @OneToMany(
    () => Team,
    (team) => team.company,
    { nullable: true },
  )
  @JoinColumn({ name: "company_id" })
  teams?: Team[];

  @OneToMany(
    () => Form,
    (form) => form.company,
    { nullable: true },
  )
  @JoinColumn({ name: "company_id" })
  forms?: Form[];
}
