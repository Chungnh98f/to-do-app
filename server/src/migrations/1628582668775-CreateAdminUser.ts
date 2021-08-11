import {
    getRepository, MigrationInterface,
    QueryRunner
} from "typeorm";
import { User } from "../entities/User";

export class CreateAdminUser1547919837483 implements MigrationInterface {
    public async up(_: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.name = "admin";
        user.hashPassword();
        user.is_admin = true;
        const userRepository = getRepository(User);
        await userRepository.save(user);

        let admin = new User();
        admin.username = "chungnh";
        admin.password = "chungnh";
        admin.name = "chungnh";
        admin.hashPassword();
        admin.is_admin = true;
        await userRepository.save(admin);
    }

    public async down(_: QueryRunner): Promise<any> {}
}
