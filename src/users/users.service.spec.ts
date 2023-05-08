import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { lastValueFrom } from 'rxjs'

const users = [{
  id: 1,
  username: 'user1',
  password: 'pass1',
}, {
  id: 2,
  username: 'user2',
  password: 'pass2',
}]

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne()', () => {
    beforeEach(() => {
      Object.defineProperty(service, 'users', {value: users})
    })

    it('should return the correct user', async () => {
      await expect(lastValueFrom(service.findOne('user1'))).resolves.toEqual(users[0])
      await expect(lastValueFrom(service.findOne('user2'))).resolves.toEqual(users[1])
    })

    it('should return no user', async () => {
      await expect(lastValueFrom(service.findOne('user3'))).resolves.toBeUndefined()
    })
  })
});
