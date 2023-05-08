import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

const storedSongs = [{
  id: 'id',
  title: 'title',
  composedBy: 'composer',
  performedBy: 'performer',
}]

describe('SongsController', () => {
  let controller: SongsController;
  let service: SongsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [
        SongsService,
        {
          provide: SongsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(storedSongs)
          }
        }
      ]
    }).compile();

    controller = module.get<SongsController>(SongsController);
    service = module.get<SongsService>(SongsService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all songs', () => {
      controller.findAll()
      expect(service.findAll).toHaveBeenCalled()
    })
  })
});
