import { CommandHandler, ICommandHandler, QueryHandler, IQueryHandler, EventBus, EventPublisher } from '@nestjs/cqrs';
import { PostService } from '../post.service';
import { GetPostQuery } from '../query/getPostQuery.query';
import { CreatePostCommand } from '../command/createPostCommand.command';
import { PostCreatedEvent } from '../events/post.event';
import { PostAggregateRoot } from './event.handler';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
    constructor(private readonly postService: PostService,
        private readonly eventPublisher: EventPublisher,

    ) { }

    async execute(command: CreatePostCommand) {
        const { title, content } = command;
        const post = await this.postService.create({ title, content });
        // event
        // const e = this.eventPublisher.mergeObjectContext(new PostAggregateRoot(Number(post.id)))
        //e.doAction(Number(post.id))
        // e.commit()
        const e = this.eventPublisher.mergeClassContext(PostAggregateRoot)
        const ev = new e(Number(post.id))
        ev.doAction(Number(post.id))

        return post;
    }
}




// query handler
@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
    constructor(private readonly postService: PostService) { }

    async execute(query: GetPostQuery) {
        const { _id } = query;
        console.log('h id:', _id)
        const post = await this.postService.findById(_id);
        console.log('h post:', post)

        return post;
    }
}
