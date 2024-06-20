import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { BlogCommentService } from '../blog-comment/blog-comment.service';
import { BlogComment } from '../blog-comment/entities/blog-comment.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { FindAllBlogDto } from './dto/find-all-blog';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

// Mock data
const mockBlog = {
  blogID: 1,
  community: 'Test Community',
  description: 'Test Description',
  title: 'Test Title',
  userID: 1,
};

const mockUser = {
  id: 1,
  username: 'TestUser',
};

const mockComment = {
  id: 1,
  blogID: 1,
  userID: 1,
  comment: 'Test Comment',
};

// Mock repositories and services
const mockBlogRepository = {
  save: jest.fn().mockResolvedValue(mockBlog),
  find: jest.fn().mockResolvedValue([mockBlog]),
  findOne: jest.fn().mockResolvedValue(mockBlog),
  update: jest.fn().mockResolvedValue(mockBlog),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

const mockUserService = {
  findOne: jest.fn().mockResolvedValue(mockUser),
};

const mockBlogCommentService = {
  findAll: jest.fn().mockResolvedValue([mockComment]),
};

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Blog, User, BlogComment]),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Blog, User, BlogComment],
          synchronize: true,
        }),
      ],
      providers: [
        BlogService,
        {
          provide: getRepositoryToken(Blog),
          useValue: mockBlogRepository,
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

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog', async () => {
      const dto: CreateBlogDto = {
        community: 'Test Community',
        description: 'Test Description',
        title: 'Test Title',
        userID: 1,
      };

      const result = await service.create(dto);
      expect(result).toEqual(mockBlog);
      expect(mockBlogRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(dto),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of blogs with user details and comments', async () => {
      const dto: FindAllBlogDto = {
        userID: 1,
        community: 'Test Community',
      };

      const result = await service.findAll(dto);
      expect(result).toEqual([
        {
          ...mockBlog,
          username: mockUser.username,
          comments: [mockComment],
        },
      ]);
      expect(mockBlogRepository.find).toHaveBeenCalledWith({ where: dto });
      expect(mockUserService.findOne).toHaveBeenCalledWith(mockBlog.userID);
      expect(mockBlogCommentService.findAll).toHaveBeenCalledWith(
        mockBlog.blogID,
      );
    });
  });

  describe('findOne', () => {
    it('should return a blog with user details and comments', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({
        ...mockBlog,
        username: mockUser.username,
        comments: [mockComment],
      });
      expect(mockBlogRepository.findOne).toHaveBeenCalledWith({
        where: { blogID: 1 },
      });
      expect(mockUserService.findOne).toHaveBeenCalledWith(mockBlog.userID);
      expect(mockBlogCommentService.findAll).toHaveBeenCalledWith(
        mockBlog.blogID,
      );
    });

    it('should throw NotFoundException if blog not found', async () => {
      mockBlogRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a blog', async () => {
      const dto: UpdateBlogDto = {
        community: 'Updated Community',
        description: 'Updated Description',
        title: 'Updated Title',
        userID: 1,
      };

      const result = await service.update(1, dto);
      expect(result).toEqual(mockBlog);
      expect(mockBlogRepository.update).toHaveBeenCalledWith(1, {
        ...mockBlog,
        ...dto,
        username: undefined,
        comments: undefined,
      });
    });

    it('should throw NotFoundException if blog not found for update', async () => {
      mockBlogRepository.findOne.mockResolvedValueOnce(null);
      const dto: UpdateBlogDto = {
        community: 'Updated Community',
        description: 'Updated Description',
        title: 'Updated Title',
        userID: 1,
      };
      await expect(service.update(1, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a blog', async () => {
      const result = await service.remove(1);
      expect(result).toEqual({ affected: 1 });
      expect(mockBlogRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
