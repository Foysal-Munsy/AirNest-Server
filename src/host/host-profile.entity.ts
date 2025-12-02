import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HostEntity } from './host.entity';

@Entity('host_profiles')
export class HostProfileEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 30, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @OneToOne(() => HostEntity, (host) => host.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  host: HostEntity;
}
