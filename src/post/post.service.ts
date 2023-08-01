import { Injectable } from '@nestjs/common';

export interface Post {
    id?: number;
    title: string;
    content: string;
}


@Injectable()
export class PostService {
    private readonly posts: Post[] = [];

    create(post: Post): Post {
        post.id = this.posts.length + 1
        this.posts.push(post);
        return post;
    }

    findById(id: number): Post {
        console.log('s id:', id)
        return this.posts.find(post => post.id === id);
    }
}
