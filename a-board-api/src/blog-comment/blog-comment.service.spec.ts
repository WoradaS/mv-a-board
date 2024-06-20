import { User } from '../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BlogCommentService } from './blog-comment.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { BlogComment } from './entities/blog-comment.entity';
import { DataSource } from 'typeorm';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';

// Mock data
const mockBlogComment = {
  id: 1,
  blogID: 1,
  userID: 1,
  comment: 'Test comment',
};

const mockUser = {
  id: 1,
  username: 'TestUser',
};

// Mock repositories and services
const mockBlogCommentRepository = {
  save: jest.fn().mockResolvedValue(mockBlogComment),
  find: jest.fn().mockResolvedValue([mockBlogComment]),
};

const mockUserService = {
  findOne: jest.fn().mockResolvedValue(mockUser),
};

describe('BlogCommentService', () => {
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

      providers: [
        BlogCommentService,
        UserService,
        {
          provide: getRepositoryToken(BlogComment),
          useValue: mockBlogCommentRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<BlogCommentService>(BlogCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog comment', async () => {

      const dto: CreateBlogCommentDto = {
        blogID: 1,
        userID: 1,
        comment: 'Test comment1',
      };

      const result = await service.create(dto);

      expect(result).toEqual(mockBlogComment);
      expect(mockBlogCommentRepository.save).toHaveBeenCalledWith(expect.objectContaining(dto));
    });
  });

  describe('findAll', () => {
    it('should return an array of blog comments with user details', async () => {

      const blogID = 1;

      const result = await service.findAll(blogID);

      expect(result).toEqual([
        {
          ...mockBlogComment,
          username: mockUser.username,
        },
      ]);
      expect(mockBlogCommentRepository.find).toHaveBeenCalledWith({ where: { blogID } });
      expect(mockUserService.findOne).toHaveBeenCalledWith(mockBlogComment.userID);
    });
  });
});
