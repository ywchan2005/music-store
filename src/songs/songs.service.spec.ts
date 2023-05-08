import { Test, TestingModule } from '@nestjs/testing';
import { Song } from '../models/song.entity'
import { SongsService } from './songs.service';
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

const storedArtists = [{
  id: 'artist-#1',
  name: 'artist-#1',
}, {
  id: 'artist-#2',
  name: 'artist-#2',
}]

const storedSongs = [ {
  id: 'song-#1',
  title: 'song-#1',
  composedBy: 'composer',
  // performedBy: 'performer',
  performedBy: [storedArtists[0]],
} ]

describe('SongsService', () => {
  let service: SongsService;
  let repository: Repository< Song >

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongsService,
        {
          provide: getRepositoryToken( Song ),
          useValue: {
            find: jest.fn().mockResolvedValue( storedSongs ),
          },
        },
      ],
    }).compile();

    service = module.get<SongsService>(SongsService);
    repository = module.get<Repository<Song>>(getRepositoryToken(Song))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe( 'findAll()', () => {
    it('should return all songs', async () => {
      const songs = await service.findAll()
      expect(songs).toEqual(storedSongs)
    })
  })

  // const john = {
  //   name: 'John',
  //   age: 30,
  // }
  // it.each([
  //   [john, 'John'],
  // ])('should support fixture', (person, expectedName) => {
  //   expect(person.name).toEqual(expectedName)
  // })
});
