import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from './user.dto';
import { IUser } from './user.interface';
import { PartialType } from '@nestjs/mapped-types'



@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel('MUser') private readonly mModel: Model<IUser>
    ) { }


    async create(user: UserDTO): Promise<User> {
        console.log('user: ', user)
        /*const new_user = await new this.userModel({
            ...user
        }).save()
        //new_user.name = user.name
        //const res = await new_user.save()
        console.log('new_user: ', new_user)*/
        //
        const data = new this.mModel()
        data.name = user.name;
        const result$ = await data.save()
        return result$
    }

    async readAll(): Promise<User[]> {
        return await this.mModel.find().exec()
    }

    async readOneById(_id: any): Promise<User> {
        return await this.mModel.findById(_id).exec()
    }

    async update(_id: any, data: UpdateUserDTO): Promise<User> {
        console.log('user: ', _id, data)
        const user = await (await this.mModel.findByIdAndUpdate(_id, { name: data.name }).setOptions({ new: true }))
            .save()
        return user
    }


}

export class UpdateUserDTO extends PartialType(UserDTO) { }
