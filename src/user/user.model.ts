import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import mongoose from 'mongoose'


//----------------------

export type UserDocument = User & Document

export class User {

    @Prop({ type: String, required: true })
    name: String;

}

export const UserSchema = SchemaFactory.createForClass(User)
//-----------------------------------------
export const MSchema = new mongoose.Schema({
    name: { type: String }
})

export const MModel = mongoose.model('MUser', MSchema)





//-------------------------------------------
