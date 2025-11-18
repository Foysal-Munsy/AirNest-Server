import { IsIn } from 'class-validator';
import type { HostStatus } from '../host.entity';


export class UpdateHostStatusDto {
  @IsIn(['active', 'inactive'], {
    message: 'status must be either active or inactive',
  })
  status: HostStatus;
}
