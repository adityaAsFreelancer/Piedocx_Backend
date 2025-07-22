import { Entity, PrimaryGeneratedColumn, Column, Generated, BaseEntity } from "typeorm";

@Entity({ name: "ServicesTbl" })
export class Services extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id!: string;

    @Column({ name: "title", type: "varchar", nullable: true })
    title!: string;

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