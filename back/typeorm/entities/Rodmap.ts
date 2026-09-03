import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "./Team";

@Entity("roadmap")
export class Roadmap {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "team_id", nullable: true })
  team_id: string | null;

  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn({ name: "team_id" })
  team: Team | null;
}