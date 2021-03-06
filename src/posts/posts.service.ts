import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/user.entity';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/create.post.dto';
import UpdatePostDto from './dto/update.post.dto';
import PostNotFoundException from './exceptions/post.not.found.exception';
import Post from './post.entity';

@Injectable()
export class PostsService {
    private lastPostId = 0;
    private posts: Post[] = [];

    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    async replacePost(id: number, post: UpdatePostDto) {
        await this.postsRepository.update(id, post);
        const updatedPost = await this.postsRepository.findOne(id, { relations: ['author'] });
        if (updatedPost) {
            return updatedPost;
        }
        throw new PostNotFoundException(id);
    }

    async deletePost(id: number) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new PostNotFoundException(id);
        }
    }

    async createPost(post: CreatePostDto, user: User) {
        const newPost = await this.postsRepository.create({ ...post, author: user });
        await this.postsRepository.save(newPost);
        return newPost;
    }

    async getPostById(id: number) {
        const post = await this.postsRepository.findOne(id, { relations: ['author'] });
        if (post) {
            return post;
        }

        throw new PostNotFoundException(id);
    }

    getAllPosts() {
        return this.postsRepository.find({ relations: ['author'] });
    }
}
