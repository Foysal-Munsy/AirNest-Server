import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HostEntity } from './host.entity';
import { BookingEntity } from './booking.entity';

@Entity('properties')
export class PropertyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 200 })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerNight: number;

  @Column({ type: 'int', unsigned: true })
  bedrooms: number;

  @ManyToOne(() => HostEntity, (host) => host.properties, {
    onDelete: 'CASCADE',
  })
  host: HostEntity;

  @OneToMany(() => BookingEntity, (booking) => booking.property, {
    cascade: true,
  })
  bookings: BookingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
