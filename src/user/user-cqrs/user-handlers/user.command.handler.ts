import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateUserCommand } from '../user-command/createUserCommand.command';
import { UserAggregateRoot } from '../user-aggregates/user.aggregate.root';
import { UserService } from 'src/user/user.service';


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

        return user
    }

}

export const UserCommandHandlers = [CreateUserHandler]

