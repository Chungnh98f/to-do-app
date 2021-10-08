import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Todo } from "./Todo";

@Entity()
export class Type extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({ unique: true })
    name!: string;

    @OneToMany(() => Todo, (todo) => todo.type)
    todos: Todo[];
}
