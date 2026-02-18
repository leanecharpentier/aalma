import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Color } from './Color';
import { Team } from './Team';

@Entity('company')
export class Company {
  @PrimaryColumn('integer')
  id!: number;

  @Column()
  name: string; 

  @Column('text', { name: 'color_id', nullable: true })
  color_id?: number;

  @Column('date', { name: 'createdAt' })
  createdAt!: Date;

  @Column('date', { name: 'updatedAt' })
  updatedAt!: Date;

  @ManyToOne(() => Color, { nullable: true })
  @JoinColumn({ name: 'color_id' })
  color?: Color;
  
  @OneToMany(() => Team, team => team.company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  teams?: Team[];
}