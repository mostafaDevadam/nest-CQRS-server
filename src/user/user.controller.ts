import { Controller, Post, Patch, Get, Param, Body, Res, HttpStatus, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './user-cqrs/user-command/createUserCommand.command';
import { GetUserQuery } from './user-cqrs/user-query/getUserQuery.query';
import { GetAllUsersQuery } from './user-cqrs/user-query/getAllUsersQuery.query';
import { UpdateUserCommand } from './user-cqrs/user-command/updateUserCommand.command';

@Controller('user')
export class UserController {
    constructor(private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    async createUser(@Body() user: any) {
        const { name } = user
        const command = new CreateUserCommand(name)
        const usr = await this.commandBus.execute(command)
        return usr

    }

    @Get('/:_id')
    async findUser(@Param('_id') _id: any) {
        const query = new GetUserQuery(_id)
        const userQ = await this.queryBus.execute(query)
        return userQ

    }

    @Get()
    async findAllUsers() {
        const query = new GetAllUsersQuery()
        const usersQ = await this.queryBus.execute(query)
        return usersQ

    }

    @Patch('/:_id')
    async update(@Param('_id') _id: any, @Body() user: any) {
        const { name } = user
        const command = new UpdateUserCommand(_id, name)
        const usr = await this.commandBus.execute(command)
        return usr
    }

}


