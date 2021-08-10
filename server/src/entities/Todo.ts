import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: Number;

    @Column()
    name!: string;

    @Column()
    is_completed!: boolean;

    @ManyToOne(() => User, (user) => user.todos)
    user: User;
}
