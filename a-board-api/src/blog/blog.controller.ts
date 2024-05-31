import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FindAllBlogDto } from './dto/find-all-blog';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll(
    @Query('userID') userID?: string,
    @Query('community') community?: string,
    @Query('search') search?: string,
  ) {
    const req: FindAllBlogDto = {
      userID: userID ? parseInt(userID) : undefined,
      community: community?.length > 0 ? community : undefined,
      search: search?.length > 0 ? search : undefined,
    };
    return this.blogService.findAll(req);
  }

  @Get(':blogID')
  findOne(@Param('blogID') blogID: string) {
    return this.blogService.findOne(+blogID);
  }

  @Patch(':blogID')
  update(
    @Param('blogID') blogID: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogService.update(blogID ? parseInt(blogID) : undefined, updateBlogDto);
  }

  @Delete(':blogID')
  remove(@Param('blogID') blogID: string) {
    return this.blogService.remove(+blogID);
  }
}
