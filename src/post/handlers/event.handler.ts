import { AggregateRoot, EventsHandler, IEventHandler, } from "@nestjs/cqrs";
import { PostCreatedEvent } from "../events/post.event";


export class PostAggregateRoot extends AggregateRoot {
    constructor(private _id: number | string) {
        super();
        this.autoCommit = true
    }

    doAction(_id$: number | string) {
        this.apply(new PostCreatedEvent(this._id))
    }

}

@EventsHandler(PostCreatedEvent)
export class PostEventHandler implements IEventHandler<PostCreatedEvent> {
    handle(event: PostCreatedEvent) {
        console.log(`Post with id ${event._id} has been created!`);
    }
}
