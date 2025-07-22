import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Tokentbl } from "./Token.entity";

@Entity({ name: "Certificate" })
export class CertificateTbl extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id!: string;

    @Column({ name: "tokenid", type: "varchar", nullable: true })
    tokenid!: string;


    @Column({ name: "studentname", type: "varchar", nullable: true })
    studentname!: string;

    @Column({ name: "college", type: "varchar", nullable: true })
    college!: string;

    @Column({ name: "whatsappNumber", type: "varchar", nullable: true })
    whatsappNumber!: string;

    @Column({ name: "email", type: "varchar", nullable: true })
    email!: string;

    @Column({name:"feedback",type:"varchar",nullable:true})
    feedback!:string;

    @Column({ name: "Course", type: "varchar", nullable: true })
    course!: string;

    @Column({ name: "createdAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ name: "updatedAt", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}
