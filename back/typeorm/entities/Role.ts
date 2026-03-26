import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity("role")
export class Role {
  @PrimaryColumn("integer")
  id!: number;

  @Column()
  name: string;

  @Column("date", { name: "createdAt" })
  createdAt!: Date;

  @Column("date", { name: "updatedAt" })
  updatedAt!: Date;

  @OneToMany(
    () => User,
    (user) => user.role,
    { nullable: true },
  )
  @JoinColumn({ name: "role_id" })
  users?: User[];
}

export const SUPER_ADMIN_ROLE_ID = 1;
export const ADMIN_ROLE_ID = 2;
export const CEO_ROLE_ID = 3;
export const HR_ROLE_ID = 4;
export const MANAGER_ROLE_ID = 5;
export const EMPLOYEE_ROLE_ID = 6;
export const HEALTH_REFEREE_ROLE_ID = 6;
