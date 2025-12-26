import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
}

@Injectable()
export class AppService {
  private users: Array<User> = [
    { id: 1, name: 'Tigran' },
    { id: 2, name: 'Artur' },
  ];

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user: User) => user.id === id);
  }

  addUser(newUser: User) {
    this.users.push(newUser);
  }

  deleteUserById(id: number) {
    this.users = this.users.filter((user: User) => user.id !== id);
  }

  logUsers() {
    console.log(this.users);
  }
}
