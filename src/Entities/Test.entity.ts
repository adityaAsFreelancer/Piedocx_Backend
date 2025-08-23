import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Question } from './Question.entity';

@Entity('Testbl')
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'title', type: 'varchar', nullable: true })
  title!: string;

  @OneToMany(() => Question, (question) => question.test, { cascade: ['remove'] })
  questions!: Question[];

  @Column({ name: 'question', type: 'int', nullable: true })
  question!: number;

  @Column({ name: 'marks', type: 'int', nullable: true })
  marks!: number;

  @Column({ name: 'time', type: 'int', nullable: true })
  time!: number;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt!: Date;
}
