import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("role")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

export const SUPER_ADMIN_ROLE_ID = "Super Admin";
export const ADMIN_ROLE_ID = "Admin";
export const CEO_ROLE_ID = "CEO";
export const HR_ROLE_ID = "HR";
export const MANAGER_ROLE_ID = "Manager";
export const EMPLOYEE_ROLE_ID = "Employee";
export const HEALTH_REFEREE_ROLE_ID = "Health Referee";
