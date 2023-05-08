import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from '../users/users.service';
import { Channel, MessageQueue } from '../notifier/notifier.constants';
import { Observable, of, filter, map, defaultIfEmpty } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(MessageQueue.ID) private client: ClientProxy,
  ) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  validateUser(username: string, pass: string): Observable<any> {
    return this.usersService.findOne(username).pipe(
      filter(user => user?.password === pass),
      map(user => {
        const { password, ...result } = user
        return result
      }),
    )
  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.id };
  //   // this.client.emit('user__logged_in', payload)
  //   this.client.emit(Channel.UserLoggedIn, payload)
  //   // this.client.send('user__logged_in', payload)
  //   this.logger.log(`[${Channel.UserLoggedIn}] ${JSON.stringify(payload)}`)
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
  login(user: Observable<User>): Observable<any> {
    return user.pipe(
      map(user => {
        const payload = { username: user.username, sub: user.id }
        this.client.emit(Channel.UserLoggedIn, payload)
        this.logger.log(`[${Channel.UserLoggedIn}] ${JSON.stringify(payload)}`)
        return {
          access_token: this.jwtService.sign(payload),
        }
      }),
    )
  }
}
