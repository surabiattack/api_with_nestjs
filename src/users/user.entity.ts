import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;
}

export default User;