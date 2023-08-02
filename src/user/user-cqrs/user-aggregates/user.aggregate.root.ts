import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../user-events/user.created.event';
import { UserUpdatedEvent } from '../user-events/user.updated.event';


export class UserAggregateRoot extends AggregateRoot {
    constructor(private _id: any) {
        super()
        this.autoCommit = true
        //this.apply(new UserCreatedEvent(this._id))
    }

    applyCreated(_id$: any) {
        if (_id$ === this._id)
            this.apply(new UserCreatedEvent(_id$))
    }

    applyUpdated(_id: any) {
        if (_id === this._id)
            this.apply(new UserUpdatedEvent(_id))
    }
}
