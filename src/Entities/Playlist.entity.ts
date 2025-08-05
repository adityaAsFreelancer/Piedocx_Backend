// src/entities/Playlist.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Video } from './Video.entity';

@Entity('playlists')
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  thumbnailUrl!: string;

  @Column({ default: 0 })
  progress!: number;

  @Column()
  lessons!: number;

  @Column()
  duration!: string;

  @Column()
  difficulty!: string;

  @Column()
  color!: string;

  @Column()
  secondaryColor!: string;

  @OneToMany(() => Video, (video) => video.playlist)
  videos!: Video[];
}
