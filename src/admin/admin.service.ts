import { Injectable } from '@nestjs/common';

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
}
