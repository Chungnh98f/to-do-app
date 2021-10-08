import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities/User";

export class CreateAdminUser1547919837483 implements MigrationInterface {
    public async up(_: QueryRunner): Promise<any> {
        let admin = new User();
        admin.username = "admin";
        admin.password = "admin";
        admin.email = "admin@gmail.com";
        admin.hashPassword();
        admin.is_admin = true;
        const userRepository = getRepository(User);
        await userRepository.save(admin);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE if exists "user" cascade;`);
        await queryRunner.query(`DROP TABLE if exists "todo" cascade;`);
        await queryRunner.query(`DROP TABLE if exists "type" cascade;`);
    }
}
