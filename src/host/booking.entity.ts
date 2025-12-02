import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PropertyEntity } from './property.entity';
import { HostEntity } from './host.entity';

@Entity('bookings')
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  guestName: string;

  @Column({ type: 'date' })
  checkIn: string;

  @Column({ type: 'date' })
  checkOut: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed'],
    default: 'pending',
  })
  status: 'pending' | 'confirmed';

  @ManyToOne(() => PropertyEntity, (property) => property.bookings, {
    onDelete: 'CASCADE',
  })
  property: PropertyEntity;

  @ManyToOne(() => HostEntity, (host) => host.bookings, {
    onDelete: 'CASCADE',
  })
  host: HostEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
