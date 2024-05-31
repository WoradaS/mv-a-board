import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [path.join(__dirname, '**/entities/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    UserModule,
    BlogModule,
    BlogCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
