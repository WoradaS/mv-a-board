import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { BlogComment } from './entities/blog-comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogCommentService {
  constructor(
    @InjectRepository(BlogComment)
    private blogCommentRepository: Repository<BlogComment>,
    private userRepository: UserService,
  ) {}

  create(req: CreateBlogCommentDto) {
    const blogComment = new BlogComment();

    blogComment.blogID = req.blogID;
    blogComment.userID = req.userID;
    blogComment.comment = req.comment;

    return this.blogCommentRepository.save(blogComment);
  }

  async findAll(blogID: number) {
    const blogComment = await this.blogCommentRepository.find({
      where: {
        blogID,
      },
    });

    const blogCommentList = await Promise.all(
      blogComment.map(async (b) => {
        const user = await this.userRepository.findOne(b.userID);
        return { ...b, username: user.username };
      }),
    );

    return blogCommentList;
  }
}
