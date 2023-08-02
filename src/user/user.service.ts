import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from './user.dto';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        //@InjectModel('User') private readonly mModel: Model<IUser>
    ) { }


    async create(user: UserDTO): Promise<User> {
        console.log('user: ', user)
        const new_user = await new this.userModel({
            ...user
        }).save()
        //new_user.name = user.name
        //const res = await new_user.save()
        console.log('new_user: ', new_user)
        //
        /*const data = new this.mModel()
        data.name = user.name;
        const result$ = await data.save()*/
        return new_user
    }

    async readAll(): Promise<User[]> {
        return await this.userModel.find().exec()
    }


}
