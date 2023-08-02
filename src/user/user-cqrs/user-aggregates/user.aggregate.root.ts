import { AggregateRoot } from '@nestjs/cqrs';


export class UserAggregateRoot extends AggregateRoot {
    constructor() {
        super()
        this.autoCommit = true
    }
}
