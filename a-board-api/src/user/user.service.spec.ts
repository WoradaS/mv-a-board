import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

// Mock Repository
const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
      ],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Reset all mock functions before each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const username = 'test user';
      const mockUser = {
        id: 1,
        username,
      };
      mockRepository.findOne.mockResolvedValueOnce(null);
      mockRepository.save.mockResolvedValueOnce(mockUser);

      const result = await service.create(username);

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { username },
      });
      expect(mockRepository.save).toHaveBeenCalledWith(expect.any(User));
    });

    it('should return existing user if username already exists', async () => {
      const username = 'existing user';
      const mockUser = {
        id: 1,
        username,
      };
      mockRepository.findOne.mockResolvedValueOnce(mockUser);

      const result = await service.create(username);

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { username },
      });
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the user with the given id', async () => {
      const id = 1;
      const mockUser = {
        id,
        username: 'test user',
      };
      mockRepository.findOne.mockResolvedValueOnce(mockUser);

      const result = await service.findOne(id);

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw NotFoundException if user not found', async () => {
      const id = 999;

      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
