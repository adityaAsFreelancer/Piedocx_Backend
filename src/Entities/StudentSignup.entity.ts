import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Generated } from 'typeorm';

@Entity({ name: "Students" })
export class StudentSignup extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated('uuid')
  id: any
  @Column()
  name!: string;

  @Column()
  college!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  mobile!: string;

  @Column()
  course!: string;

  @Column()
  year!: string;

  @Column()
  gender!: string;

  @Column({name:"profile",type:"varchar",nullable:true})
  profile!:string;

  @Column({ name: "token", type: "varchar", length: 255, default: null })
  token: any

  @Column({ name: "createdAt", type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' })
  createdAt: any

  @Column({ name: "updatedAt", type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: any
}
