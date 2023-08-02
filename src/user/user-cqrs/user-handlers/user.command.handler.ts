import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateUserCommand } from '../user-command/createUserCommand.command';
import { UserAggregateRoot } from '../user-aggregates/user.aggregate.root';
import { UserService } from 'src/user/user.service';
import { UpdateUserCommand } from '../user-command/updateUserCommand.command';


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand>{
    constructor(
        private readonly userService: UserService,
        private readonly eventPublisher: EventPublisher,

    ) { }

    async execute(command: CreateUserCommand): Promise<any> {

        const { name } = command
        const user = await this.userService.create({ name })

        const e = this.eventPublisher.mergeClassContext(UserAggregateRoot)
        const ev = new e(user['_id'])
        ev.applyCreated(user['_id'])

        return user
    }

}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        private readonly userService: UserService,
        private readonly eventPublisher: EventPublisher,

    ) { }
    async execute(command: UpdateUserCommand): Promise<any> {
        const { _id, name } = command
        console.log(command)
        const user = await this.userService.update(_id, { name })

        const e = this.eventPublisher.mergeClassContext(UserAggregateRoot)
        const ev = new e(user['_id'])
        ev.applyUpdated(user['_id'])

        return user
    }


}

export const UserCommandHandlers = [CreateUserHandler, UpdateUserHandler]

