import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy'
import { of, lastValueFrom, EMPTY } from 'rxjs';

// const validResult = {
//   username: 'user',
// }

const validUser = {
  username: 'user',
  password: 'password',
}

const invalidUser = {
  username: 'user',
  password: 'wrong_password',
}

// const validToken = {
//   access_token: 'token',
// }

const authService = {
  provide: AuthService,
  useValue: {
    // validateUser: jest.fn().mockResolvedValue(validUser),
    validateUser: jest.fn().mockReturnValue(of(validUser)),
  },
}

const authServiceWithNoUserValidated = {
  provide: AuthService,
  useValue: {
    validateUser: jest.fn().mockReturnValue(EMPTY),
  },
}

describe('LocalStrategy', () => {
  let strategy: LocalStrategy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, authService],
    }).compile();
    strategy = module.get<LocalStrategy>(LocalStrategy)
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined()
  });

  describe('validate()', () => {
    // it('should return a valid user', async () => {
    //   await expect(strategy.validate(validUser.username, validUser.password)).resolves.toEqual(validUser)
    // })

    // it('should return null', async () => {
    //   // await expect(strategy.validate(invalidUser.username, invalidUser.password)).resolves.toBeNull()
    //   mockedAuthService.validateUser = jest.fn().mockResolvedValue(null)
    //   await expect(strategy.validate(invalidUser.username, invalidUser.password)).rejects.toThrowError(UnauthorizedException)
    // })

    it('should return a valid user', async () => {
      await expect(lastValueFrom(strategy.validate(validUser.username, validUser.password))).resolves.toEqual(validUser)
    })
  })

  describe('validate() with no user validated', () => {
    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [LocalStrategy, authServiceWithNoUserValidated],
        }).compile();
        strategy = module.get<LocalStrategy>(LocalStrategy)
    })

    it('should return null', async () => {
      await expect(lastValueFrom(strategy.validate(invalidUser.username, invalidUser.password))).rejects.toThrowError(UnauthorizedException)
    })
  })
});
