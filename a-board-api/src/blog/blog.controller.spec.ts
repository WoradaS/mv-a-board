import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogComment } from '../blog-comment/entities/blog-comment.entity';
import { User } from '../user/entities/user.entity';
import { BlogController } from './blog.controller';
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
  username: 'TestUser',
  comments: [],
};

const mockBlogService = {
  create: jest.fn().mockResolvedValue(mockBlog),
  findAll: jest.fn().mockResolvedValue([mockBlog]),
  findOne: jest.fn().mockResolvedValue(mockBlog),
  update: jest.fn().mockResolvedValue(mockBlog),
  remove: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('BlogController', () => {
  let controller: BlogController;
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
      controllers: [BlogController],
      providers: [
        {
          provide: BlogService,
          useValue: mockBlogService,
        },
      ],
    }).compile();

    controller = module.get<BlogController>(BlogController);
    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a blog', async () => {
      const dto: CreateBlogDto = {
        community: 'Test Community',
        description: 'Test Description',
        title: 'Test Title',
        userID: 1,
      };

      const result = await controller.create(dto);
      expect(result).toEqual(mockBlog);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of blogs', async () => {
      const req: FindAllBlogDto = {
        userID: 1,
        community: 'Test Community',
        search: 'Test Search',
      };

      const result = await controller.findAll(
        '1',
        'Test Community',
        'Test Search',
      );
      expect(result).toEqual([mockBlog]);
      expect(service.findAll).toHaveBeenCalledWith(req);
    });

    it('should handle optional query parameters', async () => {
      const req: FindAllBlogDto = {
        userID: undefined,
        community: undefined,
        search: undefined,
      };

      const result = await controller.findAll(undefined, undefined, undefined);
      expect(result).toEqual([mockBlog]);
      expect(service.findAll).toHaveBeenCalledWith(req);
    });
  });

  describe('findOne', () => {
    it('should return a single blog', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockBlog);
      expect(service.findOne).toHaveBeenCalledWith(1);
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

      const result = await controller.update('1', dto);
      expect(result).toEqual(mockBlog);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a blog', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ affected: 1 });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
