import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Role } from "./Role";
import { Team } from "./Team";
import { AppDataSource } from "../../DataSource";

@Entity("user")
export class User {
  @PrimaryColumn("text")
  id!: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "firstname" })
  firstname: string;

  @Column("text", { name: "lastname" })
  lastname: string;

  @BeforeInsert()
  splitName() {
    const parts = (this.name || "").trim().split(" ");
    this.firstname = parts[0] || "";
    this.lastname = parts.slice(1).join(" ") || "";
  }

  @Column("text", { name: "email", unique: true })
  email!: string;

  @Column("boolean", { name: "emailVerified" })
  emailVerified!: boolean;

  @Column("text", { name: "image", nullable: true })
  image?: string;

  @Column("integer", { name: "role_id", nullable: true })
  role_id?: number;

  @Column("integer", { name: "team_id", nullable: true })
  team_id?: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  // Relations (si les entités Role et Team existent)
  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: "role_id" })
  role?: Role;

  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn({ name: "team_id" })
  team?: Team;

  async getRole(): Promise<Role | null> {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: this.id },
      relations: { role: true },
    });
    return user?.role || null;
  }

  async getTeam(): Promise<Team | null> {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: this.id },
      relations: { team: true },
    });
    return user?.team || null;
  }

  async getCompanyId(): Promise<number> {
    const team = await this.getTeam();
    if (team) {
      const company = await team.getCompany();
      return company?.id || 0;
    }
    return 0;
  }
}
