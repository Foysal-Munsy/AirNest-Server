import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(['Admin', 'Host', 'Guest', 'Support'], {
    message: 'Role must be one of Admin, Host, Guest, Support',
  })
  role: 'Admin' | 'Host' | 'Guest' | 'Support';
}
