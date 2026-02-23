import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import { User } from './User';
import { Company } from './Company';

@Entity('team')
export class Team {
  @PrimaryColumn('integer')
  id!: number;

  @Column()
  name: string; 

  @Column('text', { name: 'company_id', nullable: true })
  company_id?: number;

  @Column('date', { name: 'createdAt' })
  createdAt!: Date;

  @Column('date', { name: 'updatedAt' })
  updatedAt!: Date;

  @OneToMany(() => User, user => user.team, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  users?: User[];

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Company;
}