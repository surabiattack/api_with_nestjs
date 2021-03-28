import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Post;
