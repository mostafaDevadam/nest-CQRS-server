import { Controller, Post, Get, Param, Body, Res, HttpStatus, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() user: any) {
        console.log('body: ', user)
        const new_one = await this.userService.create(user)
        console.log('new_one: ', new_one)
        return new_one
    }

    @Get()
    async findAllUsers() {
        const result = await this.userService.readAll()
        return result
    }

}


