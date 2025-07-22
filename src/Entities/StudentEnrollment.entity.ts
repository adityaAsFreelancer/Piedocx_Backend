import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    Column,
    Generated,
} from "typeorm";

@Entity({ name: "StudentEnrollMent" })
export class EnrollMent extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated('uuid')
    id: any

    @Column({ type: "varchar" ,nullable:true})
    name!: string;

    @Column({ type: "varchar" ,nullable:true})
    mobile!: string;

    @Column({ type: "varchar" ,nullable:true})
    email!: string;

    @Column({ type: "varchar",nullable:true })
    college!: string;

    @Column({ type: "varchar" ,nullable:true})
    applyFor!: string;

    @Column({ type: "varchar" ,nullable:true})
    course!: string;

    @Column({ type: "varchar", nullable: true })
    year?: string;

    @Column({ type: "varchar" ,nullable:true})
    mode!: string;

    @Column({ type: "varchar", default: "2025",nullable:true })
    session!: string;

    @Column({ type: "varchar", length: 255, default: null })
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
