import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { FindAllBlogDto } from './dto/find-all-blog';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { BlogCommentService } from 'src/blog-comment/blog-comment.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private userRepository: UserService,
    private blogCommentRepository: BlogCommentService,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    const blog = new Blog();
    blog.community = createBlogDto.community;
    blog.description = createBlogDto.description;
    blog.title = createBlogDto.title;
    blog.userID = Number(createBlogDto.userID);

    return this.blogRepository.save(blog);
  }

  async findAll(req: FindAllBlogDto) {
    const blog = await this.blogRepository.find({
      where: {
        userID: req.userID,
        community: req.community,
      },
    });

    const blogList = await Promise.all(
      blog.map(async (b) => {
        const user = await this.userRepository.findOne(b.userID);
        const blogComment = await this.blogCommentRepository.findAll(b.blogID);
    
        return { ...b, username: user?.username, comments: blogComment };
      })
    );

    return blogList;
  }

  async findOne(blogID: number) {
    const blog = await this.blogRepository.findOne({
      where: {
        blogID,
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const user = await this.userRepository.findOne(blog.userID);
    const blogComment = await this.blogCommentRepository.findAll(blog.blogID);

    return { ...blog, username: user?.username, comments: blogComment };
  }

  async update(blogID: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.findOne(blogID);

    blog.community = updateBlogDto.community;
    blog.description = updateBlogDto.description;
    blog.title = updateBlogDto.title;
    blog.userID = updateBlogDto.userID;

    blog.username = undefined;
    blog.comments = undefined;

    return this.blogRepository.update(blog.blogID, blog);
  }

  async remove(blogID: number) {
    return await this.blogRepository.delete(blogID);
  }
}
