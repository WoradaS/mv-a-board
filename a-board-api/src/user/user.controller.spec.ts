import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// Mock UserService
const mockUserService = {
  create: jest.fn(),
  findOne: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
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
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
      };
      const mockUser = {
        id: 1,
        username: createUserDto.username,
      };
      mockUserService.create.mockResolvedValue(mockUser);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto.username);
    });
  });

  describe('findOne', () => {
    it('should return the user with the given id', async () => {
      const userId = '1';
      const mockUser = {
        id: 1,
        username: 'testuser',
      };
      mockUserService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne(userId);

      expect(result).toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(+userId);
    });
  });
});
