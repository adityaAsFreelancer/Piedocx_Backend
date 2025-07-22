import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, BaseEntity } from 'typeorm';

@Entity({ name: "Lecture" })
export class Lecture extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: any;

  @Column({ name: "title", nullable: true })
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({name:"image",nullable:true})
  image!: string;

  @Column({name:"PlayListId",nullable:true})
  PlaylistId!:string;

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
