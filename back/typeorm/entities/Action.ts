import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Company } from "./Company";
import { Speaker } from "./Speaker";
import { Format } from "./Format";

@Entity("available_action")
export class Action {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { name: "category_id" })
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @Column("uuid", { name: "format_id" })
  format_id: string;

  @ManyToOne(() => Format)
  @JoinColumn({ name: "format_id" })
  format?: Format;

  @Column("uuid", { name: "company_id" })
  company_id: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: "company_id" })
  company?: Company;

  @Column("uuid", { name: "speaker_id" })
  speaker_id: string;

  @ManyToOne(() => Speaker)
  @JoinColumn({ name: "speaker_id" })
  speaker?: Speaker;

  @Column("int")
  duration: number;

  @Column("int")
  nb_attendees: number;

  @Column("varchar", { length: 50 })
  title: string;

  @Column("varchar", { length: 50 })
  price: string;

  @Column("text")
  description: string;

  @Column("text")
  planification: string;

  @Column("json")
  keywords: string[];
}