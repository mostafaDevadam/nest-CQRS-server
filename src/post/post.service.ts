import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface Post {
    id?: number;
    title: string;
    content: string;
}

export class PostDTO {
    readonly title: string;
    readonly content: string;
}

@Injectable()
export class PostService {
    private readonly posts: Post[] = [];

    constructor(


    ) { }

    async create(post: Post) {
        let post_ = post
        post_.id = this.posts.length + 1
        this.posts.push(post_);
        return post_;
    }

    async findById(_id: any) {
        return this.posts.find(post => post.id === _id);
        //const new_post = await this.postModel.findById(_id)
        //return 'new_post';
    }
}
