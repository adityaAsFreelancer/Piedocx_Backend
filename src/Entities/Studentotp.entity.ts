import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'StudentOtp' })
export class StudentOtp extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 6 })
  otp!: string;

  @Column({ type: 'bigint' })
  expiresAt!: number;

  @Column({ type: 'int', default: 0 })
  attempts!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  token!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
