import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Test, TestingModule } from "@nestjs/testing"
import { AuthGuard } from "./auth.guard"

const validUser = {
  username: 'user',
}

const validContext = createMock<ExecutionContext>({
  switchToHttp: () => ({
    getRequest: () => ({
      headers: {
        authorization: 'Bearer token',
      },
    })
  })
})

const invalidContextWithoutToken = createMock<ExecutionContext>({
  switchToHttp: () => ({
    getRequest: () => ({
      headers: {},
    })
  })
})

const jwtService = {
  provide: JwtService,
  useValue: {
    verifyAsync: jest.fn().mockResolvedValue(validUser),
  },
  // useValue: createMock<JwtService>({
  //   verifyAsync: jest.fn().mockResolvedValue(validUser),
  // }),
}

const jwtServiceWithExceptionThrown = {
  provide: JwtService,
  useValue: {
    verifyAsync: jest.fn().mockRejectedValue(new UnauthorizedException()),
  },
}

describe('AuthGuard', () => {
  let guard: AuthGuard

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, jwtService],
    }).compile()
    //   providers: [jwtService],
    // }).useMocker(createMock).compile()
    guard = module.get<AuthGuard>(AuthGuard)
  })

  it('should be defined', async () => {
    expect(guard).toBeDefined()
  })

  describe('canActivate()', () => {
    it('should return true', async () => {
      expect(guard.canActivate(validContext)).resolves.toBeTruthy()
    })
  
    it('should throw an unauthroized exception for requests without token', async () => {
      expect(guard.canActivate(invalidContextWithoutToken)).rejects.toThrowError(UnauthorizedException)
    })
  })

  describe('canActivate() with unauthorized exception thrown', () => {
    let guard: AuthGuard
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthGuard,
          jwtServiceWithExceptionThrown,
        ],
      }).compile()
      //   providers: [jwtServiceWithExceptionThrown],
      // }).useMocker(createMock).compile()
      guard = module.get<AuthGuard>(AuthGuard)
    })
  
    it('should throw an unauthorized exception when JwtService fails to verify', async () => {
      expect(guard.canActivate(validContext)).rejects.toThrowError(UnauthorizedException)
    })
  })
})