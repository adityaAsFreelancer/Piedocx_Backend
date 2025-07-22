import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: any;

  @Column({name:"title",nullable:true})
  title!: string;

  @Column({name:"description",nullable:true})
  description!: string;


}
