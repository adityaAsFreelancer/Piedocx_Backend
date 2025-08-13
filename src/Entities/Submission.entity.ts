import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Test } from './Test.entity';

@Entity('Submissions')
export class Submission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Generated('uuid')
  id!: string;

  @Column({ name: 'useremail', type: 'varchar', nullable: true })
  userEmail!: string;
  @Column({ name: 'testName', nullable: true })
  testName!: string;
  @Column({ name: 'name', nullable: true })
  name!: string;

  @Column({ name: "mobile", type: "varchar", nullable: true })
  mobile!: string;

  @Column({ name: 'testId', type: 'uuid' })
  testId!: string;

  @ManyToOne(() => Test, (test) => test.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'testId' })
  test!: Test;


  @Column({ default: false })
  submitted!: boolean;

  @Column({ type: 'int', nullable: true })
  score!: number;

  @Column({ type: 'json', nullable: true })
  answers!: any; // Structure: [{ questionId, selectedOption }]

  @Column({ type: 'int', nullable: true })
  correct!: number;

  @Column({ type: 'int', nullable: true })
  incorrect!: number;

  @Column({ type: 'int', nullable: true })
  unanswered!: number;

  @Column({ type: 'int', nullable: true })
  totalQuestions!: number;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt!: Date;
}
