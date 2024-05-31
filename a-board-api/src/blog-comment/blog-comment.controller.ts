import { Body, Controller, Post } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';

@Controller('blog-comment')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}

  @Post()
  create(@Body() createBlogCommentDto: CreateBlogCommentDto) {
    return this.blogCommentService.create(createBlogCommentDto);
  }
}
