import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,

    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
