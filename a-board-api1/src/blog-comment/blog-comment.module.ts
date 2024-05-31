import { Module } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentController } from './blog-comment.controller';
import { BlogComment } from './entities/blog-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogComment, User])],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, UserService],
  exports: [BlogCommentService, UserService],
})
export class BlogCommentModule {}
