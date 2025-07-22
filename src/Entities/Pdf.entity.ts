import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, Generated } from "typeorm";

@Entity({ name: "PDF" })

export class Pdftbl extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id!: string;

    @Column({ name: "title", type: "varchar", nullable: true })
    title!: string;

    @Column({ name: "size", type: "varchar", nullable: true })
    size!: string;

    @Column({ name: "url", type: "varchar", nullable: true })
    url!: string;

    @Column({ name: "thumbnail", type: "varchar", nullable: true })
    thumbnail!: string;

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