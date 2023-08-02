import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import mongoose from "mongoose";


export type PostDocument = Post & Document

export class Post {

    @Prop({ type: String, required: true })
    title: String;

    @Prop({ type: String, required: true })
    content: String;

}

export const PostSchema = SchemaFactory.createForClass(Post)

//-----------------------------------------
export const PSchema = new mongoose.Schema({
    title: { type: String }

})

export const PModel = mongoose.model('User', PSchema)
