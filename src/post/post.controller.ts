import { Body, Controller, Post, Get, Param, } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './command/createPostCommand.command';
import { GetPostQuery } from './query/getPostQuery.query';


@Controller('post')
export class PostController {

    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    async createPost(@Body() body: any) {
        const { title, content } = body;
        const command = new CreatePostCommand(title, content);
        const post = await this.commandBus.execute(command);
        return post;
    }

    @Get('/:_id')
    async getPost(@Param('_id') _id: string) {
        const query = new GetPostQuery(Number(_id));
        console.log('q:', query)
        const post = await this.queryBus.execute(query);
        console.log('post:', post)
        return post;
    }


}
