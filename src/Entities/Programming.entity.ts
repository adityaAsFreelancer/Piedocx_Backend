import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "Programming" })

export class Programming extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id!: string;

    @Column({ name: "title", type: "varchar", nullable: true })
    title!: string;

    @Column({name:"image",type:"varchar",nullable:true})
    image!:string;

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
