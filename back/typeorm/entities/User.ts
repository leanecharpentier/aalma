import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn('text')
  id!: string;

  @Column('text', { name: 'firstname' })
  firstname!: string;

  @Column('text', { name: 'lastname' })
  lastname!: string;

  @Column('text', { name: 'email', unique: true })
  email!: string;

  @Column('boolean', { name: 'emailVerified' })
  emailVerified!: boolean;

  @Column('text', { name: 'image', nullable: true })
  image?: string;

  @Column('text', { name: 'role_id', nullable: true })
  role_id?: string;

  @Column('text', { name: 'team_id', nullable: true })
  team_id?: string;

  @Column('date', { name: 'createdAt' })
  createdAt!: Date;

  @Column('date', { name: 'updatedAt' })
  updatedAt!: Date;

  // Relations (si les entités Role et Team existent)
  // @ManyToOne(() => Role, { nullable: true })
  // @JoinColumn({ name: 'role_id' })
  // role?: Role;

  // @ManyToOne(() => Team, { nullable: true })
  // @JoinColumn({ name: 'team_id' })
  // team?: Team;
}