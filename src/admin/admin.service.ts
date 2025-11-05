import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AdminService {
  private readonly users = [
    { id: 1, name: 'Foysal', email: 'foysal@gmail.com', role: 'HOST' },
    { id: 2, name: 'Nahid', email: 'nahid@gmail.com', role: 'GUEST' },
  ];

  // fetch all users
  getAllUsers() {
    return { message: 'Successfully fetched all users', data: this.users };
  }

  getUserById(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) return 'User not found';
    return { message: 'User fetched successfully', data: user };
  }

  createUser(dto: CreateUserDto) {
    const newUser = { id: Date.now(), ...dto };
    this.users.push(newUser);
    return { message: 'User created successfully', data: newUser };
  }
}
