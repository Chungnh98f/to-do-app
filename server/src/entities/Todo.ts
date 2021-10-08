import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Type } from "./Type";
import { User } from "./User";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: Number;

    @Column()
    name!: string;

    @Column()
    content!: string;

    @Column()
    is_completed!: boolean;

    @ManyToOne(() => User, (user) => user.todos)
    user!: User;

    @ManyToOne(() => Type, (type) => type.todos)
    type!: Type;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
