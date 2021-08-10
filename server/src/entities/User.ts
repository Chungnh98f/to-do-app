import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from "typeorm";
import { Todo } from "./Todo";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: false })
    name!: string;

    @Column()
    password!: string;

    @Column()
    is_admin!: boolean;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[];
}

