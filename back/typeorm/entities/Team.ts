import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

@Entity("team")
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column("text", { name: "company_id" })
  company_id: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @OneToMany(
    () => User,
    (user) => user.team,
    { nullable: true },
  )
  @JoinColumn({ name: "team_id" })
  users?: User[];

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: "company_id" })
  company?: Company;
}
