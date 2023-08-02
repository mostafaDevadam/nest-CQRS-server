import { Controller, Post, Get, Param, Body, Res, HttpStatus, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './user-cqrs/user-command/createUserCommand.command';
import { GetUserQuery } from './user-cqrs/user-query/getUserQuery.query';

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
    async findAllUsers(@Param('_id') _id: any) {
        const query = new GetUserQuery(_id)
        const userQ = await this.queryBus.execute(query)
        return userQ

    }

}


