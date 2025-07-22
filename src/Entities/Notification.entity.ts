import { Entity, BaseEntity, Column, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Notification" })
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated('uuid')
    id: any;

    @Column({name:"title,",type:"varchar",nullable:true})
    title!: string;

    @Column({ name: "description", type: "varchar", length: 255, default: null })
    description: any

    @Column({ name: "createdAt", type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' })
    createdAt: any

    @Column({ name: "updatedAt", type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: any
}