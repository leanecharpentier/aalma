import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Company } from './Company';

@Entity('color')
export class Color {
  @PrimaryColumn('integer')
  id!: number;

  @Column()
  name: string; 

  @Column()
  hexacode: string; 

  @Column('date', { name: 'createdAt' })
  createdAt!: Date;

  @Column('date', { name: 'updatedAt' })
  updatedAt!: Date;

  @OneToMany(() => Company, company => company.color, { nullable: true })
  @JoinColumn({ name: 'color_id' })
  companies?: Company[];
}