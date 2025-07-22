import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, Generated } from "typeorm";

@Entity({ name: "Client" })

export class Clienttbl extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id!: string;

    @Column({ name: "image", type: "varchar", nullable: true })
    image!: string;

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