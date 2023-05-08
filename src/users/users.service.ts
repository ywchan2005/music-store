import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

export type User = any

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }
  findOne(username: string): Observable<User | undefined> {
    return of(this.users.find(user => user.username === username))
  }
}
