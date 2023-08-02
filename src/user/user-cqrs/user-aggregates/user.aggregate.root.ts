import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../user-events/user.created.event';


export class UserAggregateRoot extends AggregateRoot {
    constructor(private _id: any) {
        super()
        this.autoCommit = true
        this.apply(new UserCreatedEvent(this._id))
    }

    applyAgain(_id$: any) {
        this.apply(new UserCreatedEvent(_id$))
    }
}
