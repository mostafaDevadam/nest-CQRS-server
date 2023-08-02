import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../user-query/getUserQuery.query';
import { UserService } from '../../user.service';
import { GetAllUsersQuery } from '../user-query/getAllUsersQuery.query';

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


@QueryHandler(GetAllUsersQuery)
export class getAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(private readonly userService: UserService) { }
    async execute(query: any): Promise<any[]> {
        const users = await this.userService.readAll()
        return users
    }

}

export const UserQueryHandlers = [getUserHandler, getAllUsersHandler]
