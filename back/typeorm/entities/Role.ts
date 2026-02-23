import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import { User } from './User';

@Entity('role')
export class Role {
  @PrimaryColumn('integer')
  id!: number;

  @Column()
  name: string; 

  @Column('date', { name: 'createdAt' })
  createdAt!: Date;

  @Column('date', { name: 'updatedAt' })
  updatedAt!: Date;

  @OneToMany(() => User, user => user.role, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  users?: User[];
}