import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Roadmap } from "./Rodmap";

@Entity("priority")
export class Priority {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "roadmap_id" })
  roadmap_id: string;

  @ManyToOne(() => Roadmap)
  @JoinColumn({ name: "roadmap_id" })
  roadmap: Roadmap;

  @Column({ type: "varchar" })
  memo: string;
}