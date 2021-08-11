import * as bcrypt from "bcryptjs";
import { MinLength } from "class-validator";
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Todo } from "./Todo";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({ unique: true })
    @MinLength(5, {
        message: "username is too short",
    })
    username!: string;

    @Column({ unique: false })
    name!: string;

    @Column({ select: false })
    @MinLength(5, {
        message: "password is too short",
    })
    password!: string;

    @Column({ select: false })
    is_admin!: boolean;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[];

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
