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

  @Column({ default: 0 })
  lessons!: number;

  @Column({ default: '' })
  duration!: string;

  @Column({ default: 'Beginner' })
  difficulty!: string;

  @Column({ default: '#000000' })
  color!: string;

  @Column({ default: '#FFFFFF' })
  secondaryColor!: string;

  @OneToMany(() => Video, (video) => video.playlist)
  videos!: Video[];
}
