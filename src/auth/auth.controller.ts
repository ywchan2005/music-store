import { Controller, Get, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // async login(@Request() req) {
  login(@Request() req): Observable<any> {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): User {
    if(!('user' in req)) {
      throw new NotFoundException()
    }
    return req.user
  }
}
