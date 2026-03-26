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
import { AppDataSource } from "../../DataSource";

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

  async getCompany(): Promise<Company | null> {
    const team = await AppDataSource.getRepository(Team).findOne({
      where: { id: this.id },
      relations: { company: true },
    });
    return team?.company || null;
  }
}
