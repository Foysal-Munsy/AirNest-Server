import { CouponRequest } from 'src/coupon_request/entities/coupon_request.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('coupons')
export class CouponEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column('integer')
  discount: number;

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'user_coupons' })
  users: UserEntity[];

  @OneToMany(() => CouponRequest, (req) => req.coupon)
  requests: CouponRequest[];
}
