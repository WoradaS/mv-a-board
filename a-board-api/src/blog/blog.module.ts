import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { BlogCommentService } from 'src/blog-comment/blog-comment.service';
import { BlogComment } from 'src/blog-comment/entities/blog-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User, BlogComment])],
  controllers: [BlogController],
  providers: [BlogService, UserService, BlogCommentService],
  exports: [BlogService, UserService, BlogCommentService],
})
export class BlogModule {}
