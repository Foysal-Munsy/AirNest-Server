import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};
@Injectable()
export class AdminService {
  private users: User[] = [
    { id: 1, name: 'Foysal', email: 'foysal@gmail.com', role: 'HOST' },
    { id: 2, name: 'Nahid', email: 'nahid@gmail.com', role: 'GUEST' },
  ];

  // fetch all users
  getAllUsers(): string | object {
    return { message: 'Successfully fetched all users', data: this.users };
  }

  getUserById(id: number): string | object {
    const user = this.users.find((u) => u.id === id);
    if (!user) return 'User not found';
    return { message: 'User fetched successfully', data: user };
  }

  createUser(dto: CreateUserDto): string | object {
    const newUser = {
      id: Date.now(),
      name: dto.name,
      email: dto.email,
      role: dto.role,
      nidNumber: dto.nidNumber,
      nidImage: dto.nidImage,
    };
    this.users.push(newUser);
    return { message: 'User created successfully' };
  }

  updateUser(id: number, dto: UpdateUserDto): string | object {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return 'User not found';

    this.users[index] = { ...this.users[index], ...dto };
    return { message: 'User updated successfully', data: this.users[index] };
  }

  deleteUser(id: number): string | object {
    const exists = this.users.some((u) => u.id === id);
    if (!exists) return 'User not found';

    this.users = this.users.filter((u) => u.id !== id);
    return { message: `User with ID ${id} deleted successfully` };
  }
  //
  findUserByEmail(email: string): string | object {
    const user = this.users.find((u) => u.email === email);
    if (!user) return 'User not found';
    return { name: user.name };
  }
  resetUserRoles(): string | object {
    this.users = this.users.map((u) => ({ ...u, role: 'GUEST' }));
    return { message: 'All user roles reset to GUEST', data: this.users };
  }
  countUsers(): string | object {
    return { message: 'Total users counted', total: this.users.length };
  }
}
