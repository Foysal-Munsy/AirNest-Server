import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyEntity } from './property.entity';
import { BookingEntity } from './booking.entity';
import { HostProfileEntity } from './host-profile.entity';

export type HostStatus = 'active' | 'inactive';

@Entity('hosts')
export class HostEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  // Allow nulls to keep schema sync compatible with legacy rows; validate in services.
  @Column({ type: 'varchar', length: 100, nullable: true })
  fullName: string;

  // Marked nullable to avoid sync failures when existing rows lack an email; enforce required email at the app layer.
  @Column({ type: 'varchar', length: 150, unique: true, nullable: true })
  email: string;

  // Legacy rows may lack hashes; nullable keeps sync alive while data is backfilled.
  @Column({ type: 'varchar', length: 255, select: false, nullable: true })
  passwordHash: string;

  // Legacy records may lack age; nullable prevents sync failures.
  @Column({ type: 'int', unsigned: true, nullable: true })
  age: number;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: HostStatus;

  @OneToMany(() => PropertyEntity, (property) => property.host, {
    cascade: true,
  })
  properties: PropertyEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.host, {
    cascade: true,
  })
  bookings: BookingEntity[];

  @OneToOne(() => HostProfileEntity, (profile) => profile.host, {
    cascade: true,
    eager: true,
  })
  profile?: HostProfileEntity;
}
