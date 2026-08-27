import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./Team";

@Entity("roadmap")
export class Roadmap {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { name: "team_id" })
  team_id: string;

  @ManyToOne(() => Team)
  @JoinColumn({ name: "team_id" })
  team?: Team;
}