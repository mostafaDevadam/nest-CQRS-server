import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../user-events/user.created.event';


export class UserAggregateRoot extends AggregateRoot {
    constructor(private _id: any) {
        super()
        this.autoCommit = true
        //this.apply(new UserCreatedEvent(this._id))
    }

    applyCreated(_id$: any) {
        if (_id$) {
            this.apply(new UserCreatedEvent(_id$))
        } else if (this._id) {
            this.apply(new UserCreatedEvent(this._id))
        }

    }

    applyUpdated(_id: any) {
        if (_id) {
            this.apply(new UserCreatedEvent(_id))
        } else if (this._id) {
            this.apply(new UserCreatedEvent(this._id))
        }
    }
}
