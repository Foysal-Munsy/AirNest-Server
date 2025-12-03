import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; //bcrypt hash

  @Column({ length: 50 })
  fullname: string;

  @Column({
    type: 'enum',
    enum: ['Admin', 'Host', 'Guest', 'Support'],
    default: 'Guest',
  })
  role: 'Admin' | 'Host' | 'Guest' | 'Support';

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  created_at: Date;
}
