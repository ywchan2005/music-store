import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageQueue } from '../notifier/notifier.constants';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { of, lastValueFrom, isEmpty } from 'rxjs';

const validResult = {
  username: 'user',
}

const validUser = {
  username: 'user',
  password: 'password',
}

const invalidUser = {
  username: 'user',
  password: 'wrong_password',
}

const validToken = {
  access_token: 'token',
}

const usersService = {
  provide: UsersService,
  useValue: {
    findOne: jest.fn().mockReturnValue(of(validUser)),
  },
}

const jwtService = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(validToken.access_token),
  },
}

const clientProxy = {
  provide: MessageQueue.ID,
  useValue: {
    emit: jest.fn(),
  },
}

describe('AuthService', () => {
  let service: AuthService;
  let client: ClientProxy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        usersService,
        jwtService,
        clientProxy,
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    client = module.get<ClientProxy>(MessageQueue.ID)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser()', () => {
    // it('should return a valid user without password', async () => {
    //   await expect(service.validateUser(validUser.username, validUser.password)).resolves.toEqual(validResult)
    // })

    // it('should return null for invalid user', async () => {
    //   await expect(service.validateUser(invalidUser.username, invalidUser.password)).resolves.toBeNull()
    // })

    it('should return a valid user without password', async () => {
      await expect(lastValueFrom(service.validateUser(validUser.username, validUser.password))).resolves.toEqual(validResult)
    })

    it('should return null', async () => {
      await expect(lastValueFrom(service.validateUser(invalidUser.username, invalidUser.password).pipe(isEmpty()))).resolves.toBeTruthy()
    })
  })

  describe('login()', () => {
    // it('should return a valid token', async () => {
    //   const token = await service.login(validUser)
    //   expect(token.access_token).toEqual(validToken.access_token)
    //   expect(mockedClient.emit).toHaveBeenCalled()
    // })

    it('should return a valid token', async () => {
      const token = await lastValueFrom(service.login(of(validUser)))
      expect(token.access_token).toEqual(validToken.access_token)
      expect(client.emit).toHaveBeenCalled()
    })
  })
});
