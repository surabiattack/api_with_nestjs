import Category from 'src/categories/category.entity';
import User from 'src/users/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    category?: string;

    @ManyToOne(() => User, (author: User) => author.posts)
    author: User;

    @ManyToMany(() => Category, (category: Category) => category.posts)
    @JoinTable()
    categories: Category[];
}

export default Post;
