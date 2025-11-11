import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(value: CreateUserDto) {
    if (!value) throw new BadRequestException('Body is required');

    const gender = (value.gender ?? '').trim().toLowerCase();

    if (!['male', 'female'].includes(gender)) {
      throw new BadRequestException('Gender must be "male" or "female"');
    }

    value.gender = gender as 'male' | 'female';
    return value;
  }
}
