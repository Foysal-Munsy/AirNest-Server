import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type HostStatus = 'active' | 'inactive';

@Entity('hosts') 
export class HostEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number; 

  @Column({ type: 'varchar', length: 100 })
  fullName: string; 

  @Column({ type: 'int', unsigned: true })
  age: number; 

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: HostStatus; 
}
