import { RedisContext } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Channel } from './notifier.constants';
import { NotifierController } from './notifier.service';

const context: RedisContext = {
  getChannel: jest.fn().mockReturnValue(Channel.UserLoggedIn),
} as Partial<RedisContext> as RedisContext

describe('NotifierService', () => {
  let service: NotifierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifierController],
    }).compile();
    service = module.get<NotifierController>(NotifierController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('handleUserLoggedIn()', () => {
    it('should log a message', async () => {
      service.logger.log = jest.fn()
      await service.handleUserLoggedIn({}, context)
      expect(service.logger.log).toHaveBeenCalled()
    })
  })
});
