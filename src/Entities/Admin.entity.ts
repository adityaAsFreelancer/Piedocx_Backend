import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Generated } from "typeorm";

@Entity({ name: "AdminTable" })
export class AdminTbl extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated('uuid')
  id!: string;

  @Column({ name: "name", type: "varchar", nullable: true })
  name!: string;

  @Column({ name: "email", type: "varchar", nullable: true })
  email!: string;

  @Column({ name: "password", type: "varchar", nullable: true })
  password!: string;

  @Column({ name: "mobile", type: "bigint", nullable: true })
  mobile!: number;

  @Column({ type: "varchar", default: "2025", nullable: true })
  token!: string;

  @Column({
    name: "createdAt",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column({
    name: "updatedAt",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}