import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../user-events/user.created.event';
import { UserUpdatedEvent } from '../user-events/user.updated.event';



@EventsHandler(UserCreatedEvent)
export class UserEventHandler implements IEventHandler<UserCreatedEvent> {
    handle(event: UserCreatedEvent) {
        console.log(`User with id ${event._id} has been created!`);
    }

}

@EventsHandler(UserUpdatedEvent)
export class UserUpdateEventHandler implements IEventHandler<UserUpdatedEvent> {
    handle(event: UserUpdatedEvent) {
        console.log(`User with id ${event._id} has been updated!`);
    }

}





export const UserEventHandlers = [UserEventHandler, UserUpdateEventHandler]
