import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CreatePostHandler, GetPostHandler } from './handlers/handlers';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { PostEventHandler } from './handlers/event.handler';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema, PSchema } from './post.model';


export const CommandHandlers = [CreatePostHandler]
export const QueryHandlers = [GetPostHandler]
export const EventHandlers = [PostEventHandler]

@Module({
  imports: [

    //MongooseModule.forFeature([{ name: PostModel.name, schema: PostModel.schema }]) PSchema , PModel
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }, { name: 'Post', schema: PSchema }]),
    CqrsModule,

  ],
  controllers: [PostController],
  providers: [
    EventBus,
    PostService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [],
})
export class PostModule { }
