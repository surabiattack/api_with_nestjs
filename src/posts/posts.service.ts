import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        const updatedPost = await this.postsRepository.findOne(id);
        if (updatedPost) {
            return updatedPost;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async deletePost(id: number) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

    async createPost(post: CreatePostDto) {
        const newPost = await this.postsRepository.create(post);
        await this.postsRepository.save(newPost);
        return newPost;
    }

    async getPostById(id: number) {
        const post = await this.postsRepository.findOne(id);
        if (post) {
            return post;
        }

        throw new PostNotFoundException(id);
    }

    getAllPosts() {
        return this.postsRepository.find();
    }
}
