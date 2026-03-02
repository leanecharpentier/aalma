import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("activity_logs")
export class ActivityLog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  action: string;

  @Column()
  status: number;

  @Column({ type: "jsonb", nullable: true })
  details: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  user: User;
}

export const ACTIVITY_SUCCESS = 1;
export const ACTIVITY_FAIL = 2;
export const ACTIVITY_PENDING = 3;
