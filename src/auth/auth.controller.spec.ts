import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const validUser = {
  username: 'user',
  password: 'password',
}

const invalidUser = {
  username: 'wrong_user',
  password: 'wrong_password',
}

const validJwt = {
  access_token: 'token',
}

const validRequest = {
  user: validUser,
}

const invalidRequestWithoutUser = {
}

const authService = {
  provide: AuthService,
  useValue: {
    login: jest.fn().mockResolvedValue(validJwt),
  },
}

const authServiceWithExceptionThrown = {
  provide: AuthService,
  useValue: {
    login: jest.fn().mockRejectedValue(new UnauthorizedException()),
  },
}

const jwtService = {
  provide: JwtService,
  useValue: {
    login: jest.fn().mockResolvedValue(validJwt),
  },
}

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authService, jwtService],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined()
  });

  describe('login()', () => {
    let controller: AuthController
    let service: AuthService

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [authService, jwtService],
      }).compile()
      controller = module.get<AuthController>(AuthController)
      service = module.get<AuthService>(AuthService)
    })

    it('should return a valid jwt', async () => {
      await controller.login(validRequest)
      expect(service.login).toHaveBeenCalled()
    })
  })

  describe('login() with unauthroized excpetion thrown', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [authServiceWithExceptionThrown, jwtService],
      }).compile()
      controller = module.get<AuthController>(AuthController)
      service = module.get<AuthService>(AuthService)
    })

    it('should throw an unauthorized exception', () => {
      expect(controller.login(invalidUser)).rejects.toThrowError(UnauthorizedException)
    })
  })

  describe('profile()', () => {
    it('should return a user', () => {
      expect(controller.getProfile(validRequest)).toEqual(validRequest.user)
    })
    it('should throw a notfound exception', () => {
      expect(() => controller.getProfile(invalidRequestWithoutUser)).toThrowError(NotFoundException)
    })
  })
});
