import Post from 'src/posts/post.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(
        () => Post,
        (post: Post) => {
            post.categories;
        },
    )
    posts: Post[];
}

export default Category;
