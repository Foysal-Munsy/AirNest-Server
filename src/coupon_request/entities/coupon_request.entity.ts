import { CouponEntity } from 'src/coupons/entities/coupon.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('coupon_requests')
export class CouponRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Rejected',
  })
  role: 'Pending' | 'Approved' | 'Rejected';

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => CouponEntity, (coupon) => coupon.requests)
  @JoinColumn({ name: 'couponId' })
  coupon: CouponEntity;
}
