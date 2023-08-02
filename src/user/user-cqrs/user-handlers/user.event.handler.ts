import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../user-events/user.created.event';



@EventsHandler(UserCreatedEvent)
export class UserEventHandler implements IEventHandler<UserCreatedEvent> {
    handle(event: UserCreatedEvent) {
        console.log(`User with id ${event._id} has been created!`);
    }

}




export const UserEventHandlers = [UserEventHandler]
