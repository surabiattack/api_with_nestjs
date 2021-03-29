import { Exclude } from 'class-transformer';
import Post from 'src/posts/post.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Address from './address.entity';

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    @Exclude()
    password: string;

    @OneToOne(() => Address, {
        eager: true,
        cascade: true,
    })
    @JoinColumn()
    address: Address;

    @OneToMany(() => Post, (post: Post) => post.author)
    posts: Post[];
}

export default User;
