import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../user-query/getUserQuery.query';
import { UserService } from '../../user.service';

@QueryHandler(GetUserQuery)
export class getUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(private readonly userService: UserService) { }
    async execute(query: GetUserQuery): Promise<any> {
        const { _id } = query
        const oneUserByID = await this.userService.readOneById(_id)
        console.log('h q oneUserByID: ', oneUserByID)
        return oneUserByID
    }

}

export const UserQueryHandlers = [getUserHandler]
