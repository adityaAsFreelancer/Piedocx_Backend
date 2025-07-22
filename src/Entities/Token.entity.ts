import { Entity, BaseEntity, PrimaryGeneratedColumn, Generated, Column } from "typeorm";

@Entity({ name: "Token" })
export class Tokentbl extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated('uuid')
    id!: string;

    @Column({ name: "tokenName", type: "varchar", nullable: true })
    tokenName!: string;

    // 🔧 FIX: Store as integer, not varchar
    @Column({ name: "expiretime", type: "varchar", nullable: true })
    expiretime!: number;


    @Column({ name: "token", type: "varchar", length: 255, default: null })
    token!: string;

    @Column({ name: "createdAt", type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}
