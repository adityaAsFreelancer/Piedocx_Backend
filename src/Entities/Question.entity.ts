import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './Test.entity';

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  type!: string;

  @Column()
  question!: string;

  @Column({ type: 'jsonb' })
  options!: {
    id: number;
    text: string;
    isCorrect: boolean;
  }[];

  @ManyToOne(() => Test, (test) => test.questions, { onDelete: 'CASCADE' }) // ✅ Add this
  @JoinColumn({ name: 'test_id' })
  test!: Test;

  @Column()
  test_id!: string;
}
