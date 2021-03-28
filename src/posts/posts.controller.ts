import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt.authentication.guard';
import CreatePostDto from './dto/create.post.dto';
import UpdatePostDto from './dto/update.post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    async getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    async getPostById(@Param('id') id: string) {
        return this.postsService.getPostById(Number(id));
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() post: CreatePostDto) {
        return this.postsService.createPost(post);
    }

    @Put(':id')
    async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
        return this.postsService.replacePost(Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return this.postsService.deletePost(Number(id));
    }
}
