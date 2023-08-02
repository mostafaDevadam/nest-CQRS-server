import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.model';

export interface IPost {
    id?: number;
    _id?: any;
    title: string;
    content: string;
}

export interface IPost$ {
    _id?: any;
    title: string;
    content: string;
}

export class PostDTO {
    title: string;
    content: string;
}

export class PostDTO$ {
    title: string;
}

@Injectable()
export class PostService {
    private readonly posts: IPost[] = [];

    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
        @InjectModel('Post') private readonly sModel: Model<PostDTO$>
    ) { }

    async create(post: IPost) {
        let post_ = post
        post_.id = this.posts.length + 1
        this.posts.push(post_);
        //this.createOne(post)
        return post_;
    }

    async createOne(post: PostDTO) {
        console.log('start createOne: -------')
        console.log('post: ', post)

        const one = await new this.postModel({
            ...post
        }).save()
        console.log('one: ', one)



        //new_one.name = user.name
        //const res = await new_user.save()
        /*
                const data = new this.postModel()
                data.title = "t_"
                data.content = "c_"
                const result$ = await data.save()
                console.log('result$: ', result$)*/

        /*const data = new this.sModel()
        data.title = post.title || "data.title"
        const result$ = await data.save()
        console.log('result$: ', result$)*/

        console.log('end createOne: -------')
        //
        return one

    }

    async findById(_id: any) {
        return this.posts.find(post => post.id === _id);
        //const new_post = await this.postModel.findById(_id)
        //return 'new_post';
    }

    async findPostById(_id: any) {
        const postById = await this.postModel.findById(_id)
        console.log('postById: ', postById)
        return postById;
    }
}
