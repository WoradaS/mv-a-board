import { Test, TestingModule } from '@nestjs/testing';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { BlogComment } from './entities/blog-comment.entity';
import { DataSource } from 'typeorm';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';

// Mock data
const mockBlogComment = {
  id: 1,
  blogID: 1,
  userID: 1,
  comment: 'Test comment',

};// Mock repositories 
const mockBlogCommentRepository = {
  save: jest.fn().mockResolvedValue(mockBlogComment),
  find: jest.fn().mockResolvedValue([mockBlogComment]),
};

// Mock BlogCommentService
const mockBlogCommentService = {
  create: jest.fn().mockResolvedValue(mockBlogComment),
};
const mockUser = {
  id: 1,
  username: 'TestUser',
};
const mockUserService = {
  findOne: jest.fn().mockResolvedValue(mockUser),
};

describe('BlogCommentController', () => {
  let controller: BlogCommentController;
  let service: BlogCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([BlogComment, User]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [BlogComment, User],
          synchronize: true,
        }),
      ],
      controllers: [BlogCommentController],
      providers: [
        {
          provide: getRepositoryToken(BlogComment),
          useValue: mockBlogCommentRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: BlogCommentService,
          useValue: mockBlogCommentService,
        },
      ],
    }).compile();

    controller = module.get<BlogCommentController>(BlogCommentController);
    service = module.get<BlogCommentService>(BlogCommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog comment', async () => {
      const dto: CreateBlogCommentDto = {
        blogID: 1,
        userID: 1,
        comment: 'Test comment',
      };

      const result = await controller.create(dto);

      expect(result).toEqual(mockBlogComment);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});
